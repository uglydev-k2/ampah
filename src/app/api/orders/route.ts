import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateOrderNumber } from "@/lib/utils";

const rateLimitMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const orderNumber = generateOrderNumber();
    const orderData = {
      user_id: user?.id || null,
      order_number: orderNumber,
      status: "pending" as const,
      payment_status: "paid" as const,
      payment_method: body.paymentMethod,
      subtotal: body.items.reduce((acc: number, item: { product: { price: number }; quantity: number }) => acc + item.product.price * item.quantity, 0),
      discount: 0,
      shipping: 0,
      tax: body.total * 0.08,
      total: body.total,
      shipping_address: {
        full_name: body.fullName,
        phone: body.phone,
        street: body.street,
        city: body.city,
        state: body.state,
        zip_code: body.zipCode,
        country: "US",
      },
      notes: body.notes || null,
    };

    const { data: order, error } = await supabase.from("orders").insert(orderData).select().single();

    if (error) {
      return NextResponse.json({ orderNumber, message: "Order recorded (demo mode)" });
    }

    if (order && body.items) {
      const orderItems = body.items.map((item: { product: { id: string; name: string; image_url: string; price: number }; quantity: number }) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image_url,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity,
      }));
      await supabase.from("order_items").insert(orderItems);
    }

    return NextResponse.json({ orderNumber, orderId: order?.id });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
