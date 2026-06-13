"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/schemas";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { FREE_SHIPPING_THRESHOLD_GHS, SHIPPING_FEE_GHS } from "@/data/ghana-prices";

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getSubtotal();
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD_GHS ? 0 : SHIPPING_FEE_GHS;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "card" },
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data: CheckoutInput) => {
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items, total }),
      });
    } catch { /* demo fallback */ }
    const num = generateOrderNumber();
    setOrderNumber(num);
    clearCart();
    setConfirmed(true);
  };

  if (items.length === 0 && !confirmed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
        <Button className="mt-4" onClick={() => window.location.href = "/shop"}>Go to Shop</Button>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Order Confirmed!</h1>
        <p className="mb-1 text-gray-600 dark:text-gray-400">Thank you for your order.</p>
        <p className="font-mono text-sm text-blue-600">Order #{orderNumber}</p>
        <p className="mt-4 text-sm text-gray-500">You&apos;ll receive a confirmation email shortly.</p>
        <Button className="mt-6" onClick={() => window.location.href = "/shop"}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" {...register("fullName")} error={errors.fullName?.message} />
              <Input label="Phone" type="tel" {...register("phone")} error={errors.phone?.message} />
              <div className="sm:col-span-2"><Input label="Street Address" {...register("street")} error={errors.street?.message} /></div>
              <Input label="City" {...register("city")} error={errors.city?.message} />
              <Input label="State" {...register("state")} error={errors.state?.message} />
              <Input label="ZIP Code" {...register("zipCode")} error={errors.zipCode?.message} />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold">Payment Method</h2>
            <div className="space-y-3">
              {(["card", "paypal", "insurance"] as const).map((method) => (
                <label key={method} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${paymentMethod === method ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "border-gray-200 dark:border-gray-700"}`}>
                  <input type="radio" value={method} {...register("paymentMethod")} className="accent-blue-600" />
                  <span className="capitalize font-medium">{method === "card" ? "Credit / Debit Card" : method === "paypal" ? "PayPal" : "Insurance"}</span>
                </label>
              ))}
            </div>
          </div>

          <Textarea label="Order Notes (optional)" {...register("notes")} />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 h-fit">
          <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
          <div className="mb-4 max-h-48 space-y-2 overflow-y-auto">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{product.name} × {quantity}</span>
                <span>{formatPrice(product.price * quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mb-4 flex gap-2">
            <Input placeholder="Coupon code" {...register("couponCode")} />
            <Button type="button" variant="outline" onClick={() => setCouponApplied(true)}>Apply</Button>
          </div>
          <div className="space-y-2 text-sm border-t border-gray-100 pt-4 dark:border-gray-800">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>{formatPrice(tax)}</span></div>
            <div className="flex justify-between font-semibold text-lg pt-2"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full">Place Order</Button>
        </div>
      </form>
    </div>
  );
}
