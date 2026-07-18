import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { createHmac } from "node:crypto";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin",
  "Access-Control-Max-Age": "86400",
} as const;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

const itemSchema = z.object({
  slug: z.string().min(1).max(120),
  title: z.string().min(1).max(160),
  price: z.number().nonnegative(),
  qty: z.number().int().positive().max(20),
});

const requestSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("create-order"),
    customerName: z.string().trim().min(2).max(80),
    phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/),
    email: z.string().trim().email().optional().or(z.literal("")),
    address: z.string().trim().max(300).optional().or(z.literal("")),
    preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    preferredTime: z.string().trim().min(2).max(60),
    items: z.array(itemSchema).min(1),
    totalAmount: z.number().nonnegative(),
    paymentMethod: z.enum(["cod", "razorpay"]),
    therapyTitles: z.string().min(1).max(1000),
  }),
  z.object({
    action: z.literal("create-payment"),
    orderDbId: z.string().uuid(),
    amount: z.number().int().positive(),
    currency: z.literal("INR").default("INR"),
  }),
  z.object({
    action: z.literal("verify-payment"),
    orderDbId: z.string().uuid(),
    razorpay_order_id: z.string().min(1),
    razorpay_payment_id: z.string().min(1),
    razorpay_signature: z.string().min(1),
  }),
]);

async function authenticate(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!token || !url || !key) return null;

  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: { Authorization: `Bearer ${token}` },
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
  const { data, error } = await client.auth.getUser(token);
  return error || !data.user ? null : data.user;
}

async function handlePost(request: Request) {
  try {
    const user = await authenticate(request);
    if (!user) return json({ error: "Please sign in again" }, 401);

    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) return json({ error: "Invalid checkout details" }, 400);
    const input = parsed.data;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (input.action === "create-order") {
      const selectedDate = new Date(`${input.preferredDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
        return json({ error: "Choose today or a future date" }, 400);
      }
      const calculatedTotal = input.items.reduce((sum, item) => sum + item.price * item.qty, 0);
      if (Math.round(calculatedTotal) !== Math.round(input.totalAmount)) {
        return json({ error: "Cart total changed. Please refresh and try again." }, 400);
      }
      const { data, error } = await supabaseAdmin
        .from("orders")
        .insert({
          user_id: user.id,
          customer_name: input.customerName,
          phone: input.phone,
          email: input.email || null,
          address: input.address || null,
          preferred_date: input.preferredDate,
          preferred_time: input.preferredTime,
          items: input.items,
          total_amount: input.totalAmount,
          payment_method: input.paymentMethod,
          therapy_titles: input.therapyTitles,
          status: input.paymentMethod === "cod" ? "confirmed_cod" : "pending",
        })
        .select("id, order_number")
        .single();
      if (error || !data) return json({ error: "Could not place order" }, 500);
      return json(data);
    }

    if (input.action === "create-payment") {
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keyId || !keySecret) return json({ error: "Payment service is not configured" }, 500);
      const { data: order, error } = await supabaseAdmin
        .from("orders")
        .select("id, user_id, total_amount, status")
        .eq("id", input.orderDbId)
        .single();
      if (error || !order || order.user_id !== user.id) return json({ error: "Order not found" }, 404);
      if (order.status !== "pending") return json({ error: "This order is not pending payment" }, 409);
      if (Math.round(Number(order.total_amount)) !== Math.round(input.amount)) {
        return json({ error: "Payment amount does not match this order" }, 400);
      }
      const authorization = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: authorization },
        body: JSON.stringify({
          amount: input.amount * 100,
          currency: input.currency,
          receipt: input.orderDbId.slice(0, 40),
          notes: { userId: user.id, orderDbId: input.orderDbId },
        }),
      });
      if (!response.ok) return json({ error: "Failed to create payment order" }, 502);
      const paymentOrder = (await response.json()) as { id: string; amount: number; currency: string };
      const { error: updateError } = await supabaseAdmin
        .from("orders")
        .update({ razorpay_order_id: paymentOrder.id })
        .eq("id", input.orderDbId)
        .eq("user_id", user.id);
      if (updateError) return json({ error: "Could not save payment order" }, 500);
      return json({ keyId, orderId: paymentOrder.id, amount: paymentOrder.amount, currency: paymentOrder.currency });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) return json({ error: "Payment service is not configured" }, 500);
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id, user_id, razorpay_order_id")
      .eq("id", input.orderDbId)
      .single();
    if (error || !order || order.user_id !== user.id || order.razorpay_order_id !== input.razorpay_order_id) {
      return json({ error: "Order not found" }, 404);
    }
    const expected = createHmac("sha256", keySecret)
      .update(`${input.razorpay_order_id}|${input.razorpay_payment_id}`)
      .digest("hex");
    if (expected !== input.razorpay_signature) {
      await supabaseAdmin.from("orders").update({ status: "payment_failed" }).eq("id", input.orderDbId).eq("user_id", user.id);
      return json({ error: "Payment signature verification failed" }, 400);
    }
    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({ status: "paid", razorpay_payment_id: input.razorpay_payment_id, razorpay_signature: input.razorpay_signature })
      .eq("id", input.orderDbId)
      .eq("user_id", user.id);
    if (updateError) return json({ error: "Could not confirm payment" }, 500);
    return json({ ok: true });
  } catch (error) {
    console.error("Checkout API error", error);
    return json({ error: "Checkout is temporarily unavailable" }, 500);
  }
}

export const Route = createFileRoute("/api/public/checkout")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => handlePost(request),
    },
  },
});