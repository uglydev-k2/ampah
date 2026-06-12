"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Product } from "@/types/database";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <Link href={`/shop/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {hasDiscount && (
          <Badge variant="danger" className="absolute left-3 top-3">
            Sale
          </Badge>
        )}
        {product.is_featured && (
          <Badge variant="info" className="absolute right-3 top-3">
            Featured
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mb-1 line-clamp-1 font-semibold text-gray-900 transition-colors hover:text-blue-600 dark:text-white">
            {product.name}
          </h3>
        </Link>
        <p className="mb-2 line-clamp-2 text-xs text-gray-500">{product.short_description || product.description}</p>
        <StarRating rating={product.rating} showValue reviewCount={product.review_count} />
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.compare_at_price!)}</span>
            )}
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleItem(product.id)}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={inWishlist ? "border-red-300 text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-red-500" : ""}`} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
