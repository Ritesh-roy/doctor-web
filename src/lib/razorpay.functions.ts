import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const createCheckoutOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        customerName: z.string().trim().min(2).max(80),
        phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/),
        email: z.string().trim().email().optional().or(z.literal("")),
        address: z.string().trim().max(300).optional().or(z.literal("")),
        preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        preferredTime: z.string().trim().min(2).max(60),
        items: z
          .array(
            z.object({
              slug: z.string().min(1).max(120),
              title: z.string().min(1).max(160),
              price: z.number().nonnegative(),
              qty: z.number().int().positive().max(20),
            }),
          )
          .min(1),
        totalAmount: z.number().nonnegative(),
        paymentMethod: z.enum(["cod", "razorpay"]),
        therapyTitles: z.string().min(1).max(1000),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const selectedDate = new Date(`${data.preferredDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
      throw new Error("Choose today or a future date");
    }

    const calculatedTotal = data.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (Math.round(calculatedTotal) !== Math.round(data.totalAmount)) {
      throw new Error("Cart total changed. Please refresh and try again.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: context.userId,
        customer_name: data.customerName,
        phone: data.phone,
        email: data.email || null,
        address: data.address || null,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        items: data.items,
        total_amount: data.totalAmount,
        payment_method: data.paymentMethod,
        therapy_titles: data.therapyTitles,
        status: data.paymentMethod === "cod" ? "confirmed_cod" : "pending",
      })
      .select("id, order_number")
      .single();

    if (error || !inserted) {
      console.error("Order create failed", error);
      throw new Error("Could not place order");
    }

    return { id: inserted.id, order_number: inserted.order_number };
  });

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        orderDbId: z.string().uuid(),
        amount: z.number().int().positive(),
        currency: z.string().default("INR"),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const RAZORPAY_API = "https://api.razorpay.com/v1";
    const basicAuth = (keyId: string, keySecret: string) =>
      "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new Error("Razorpay keys are not configured");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("id, user_id, total_amount, status")
      .eq("id", data.orderDbId)
      .single();

    if (orderError || !order || order.user_id !== context.userId) {
      throw new Error("Order not found");
    }
    if (order.status !== "pending") {
      throw new Error("This order is not pending payment");
    }
    if (Math.round(Number(order.total_amount)) !== Math.round(data.amount)) {
      throw new Error("Payment amount does not match this order");
    }

    const res = await fetch(`${RAZORPAY_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: basicAuth(keyId, keySecret),
      },
      body: JSON.stringify({
        amount: data.amount * 100, // paise
        currency: data.currency,
        receipt: data.orderDbId.slice(0, 40),
        notes: { userId: context.userId, orderDbId: data.orderDbId },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Razorpay order create failed", res.status, text);
      throw new Error("Failed to create payment order");
    }

    const rzp = (await res.json()) as { id: string; amount: number; currency: string };

    // Persist razorpay_order_id on our order row
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ razorpay_order_id: rzp.id })
      .eq("id", data.orderDbId)
      .eq("user_id", context.userId);
    if (error) {
      console.error("Failed to save razorpay_order_id", error);
      throw new Error("Could not save payment order");
    }

    return { keyId, orderId: rzp.id, amount: rzp.amount, currency: rzp.currency };
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        orderDbId: z.string().uuid(),
        razorpay_order_id: z.string(),
        razorpay_payment_id: z.string(),
        razorpay_signature: z.string(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) throw new Error("Razorpay secret not configured");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("id, user_id, razorpay_order_id")
      .eq("id", data.orderDbId)
      .single();

    if (orderError || !order || order.user_id !== context.userId || order.razorpay_order_id !== data.razorpay_order_id) {
      throw new Error("Order not found");
    }

    const { createHmac } = await import("node:crypto");
    const expected = createHmac("sha256", keySecret)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest("hex");

    if (expected !== data.razorpay_signature) {
      await supabaseAdmin
        .from("orders")
        .update({ status: "payment_failed" })
        .eq("id", data.orderDbId)
        .eq("user_id", context.userId);
      throw new Error("Payment signature verification failed");
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
      })
      .eq("id", data.orderDbId)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);

    return { ok: true };
  });
