"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingCart, Heart, Minus, Plus, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/shop/product-card";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import {
  getProductBySlug, getRelatedProducts, getReviewsByProduct, sampleCategories,
} from "@/data/sample-data";
import { useState } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) notFound();

  const related = getRelatedProducts(product.id, product.category_id);
  const reviews = getReviewsByProduct(product.id);
  const category = sampleCategories.find((c) => c.id === product.category_id);
  const images = product.images.length > 0 ? product.images : [product.image_url];
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/shop" className="mb-6 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
        <ChevronLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800">
            <Image src={images[activeImage]} alt={product.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 ${activeImage === i ? "border-blue-600" : "border-transparent"}`}>
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {category && <Badge variant="info" className="mb-2">{category.name}</Badge>}
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
          <StarRating rating={product.rating} size="md" showValue reviewCount={product.review_count} />
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.compare_at_price)}</span>
            )}
          </div>
          <p className="mt-4 text-gray-600 leading-relaxed dark:text-gray-400">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-500 hover:text-gray-900" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-gray-500 hover:text-gray-900" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
            </div>
            <Button size="lg" className="flex-1" onClick={() => addItem(product, quantity)}>
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={() => toggleItem(product.id)} className={inWishlist ? "border-red-300 text-red-500" : ""}>
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500" : ""}`} />
            </Button>
          </div>

          {product.stock <= product.low_stock_threshold && (
            <p className="mt-3 text-sm text-amber-600">Only {product.stock} left in stock — order soon!</p>
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {product.ingredients && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Ingredients</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{product.ingredients}</p>
          </div>
        )}
        {product.usage_instructions && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Usage Instructions</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{product.usage_instructions}</p>
          </div>
        )}
      </div>

      {reviews.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <StarRating rating={review.rating} />
                {review.title && <h4 className="mt-2 font-medium text-gray-900 dark:text-white">{review.title}</h4>}
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
