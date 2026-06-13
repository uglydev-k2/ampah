"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { FREE_SHIPPING_THRESHOLD_GHS, SHIPPING_FEE_GHS } from "@/data/ghana-prices";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD_GHS ? 0 : SHIPPING_FEE_GHS;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="h-8 w-8 text-gray-400" />}
        title="Your cart is empty"
        description="Browse our products and add items to your cart."
        actionLabel="Continue Shopping"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
                <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex flex-1 flex-col">
                <Link href={`/shop/${product.slug}`} className="font-semibold text-gray-900 hover:text-blue-600 dark:text-white">{product.name}</Link>
                <p className="text-sm text-gray-500">{formatPrice(product.price)} each</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-2" aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-2" aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(product.price * quantity)}</span>
                    <button onClick={() => removeItem(product.id)} className="text-gray-400 hover:text-red-500" aria-label="Remove item"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 h-fit">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>{formatPrice(tax)}</span></div>
            <div className="border-t border-gray-100 pt-2 dark:border-gray-800">
              <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          {subtotal < FREE_SHIPPING_THRESHOLD_GHS && (
            <p className="mt-2 text-xs text-emerald-600">
              Add {formatPrice(FREE_SHIPPING_THRESHOLD_GHS - subtotal)} more for free shipping!
            </p>
          )}
          <div className="mt-6 space-y-3">
            <Link href="/checkout"><Button className="w-full" size="lg">Proceed to Checkout</Button></Link>
            <Link href="/shop"><Button variant="outline" className="w-full">Continue Shopping</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
