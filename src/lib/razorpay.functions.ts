import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const RAZORPAY_API = "https://api.razorpay.com/v1";

function basicAuth(keyId: string, keySecret: string) {
  return "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}

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
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new Error("Razorpay keys are not configured");
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
    const { error } = await context.supabase
      .from("orders")
      .update({ razorpay_order_id: rzp.id })
      .eq("id", data.orderDbId);
    if (error) console.error("Failed to save razorpay_order_id", error);

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

    const { createHmac } = await import("node:crypto");
    const expected = createHmac("sha256", keySecret)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest("hex");

    if (expected !== data.razorpay_signature) {
      await context.supabase
        .from("orders")
        .update({ status: "payment_failed" })
        .eq("id", data.orderDbId);
      throw new Error("Payment signature verification failed");
    }

    const { error } = await context.supabase
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
      })
      .eq("id", data.orderDbId);
    if (error) throw new Error(error.message);

    return { ok: true };
  });
