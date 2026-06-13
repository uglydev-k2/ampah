import type { Product } from "@/types/database";
import { slugify } from "@/lib/utils";
import { getGhanaPrice } from "@/data/ghana-prices";
import { getProductImage, getProductImageThumb } from "@/data/product-images";

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface BuildCatalogOptions {
  names: string[];
  categoryId: string;
  idPrefix: string;
  descriptions: {
    short: string;
    long: string;
    usage: string;
  };
  featuredNames?: string[];
}

export function buildCatalogProducts({
  names,
  categoryId,
  idPrefix,
  descriptions,
  featuredNames = [],
}: BuildCatalogOptions): Product[] {
  const slugCounts = new Map<string, number>();

  return names.map((name, index) => {
    const baseSlug = slugify(name);
    const count = slugCounts.get(baseSlug) ?? 0;
    slugCounts.set(baseSlug, count + 1);
    const slug = count > 0 ? `${baseSlug}-${count + 1}` : baseSlug;

    const hash = hashString(name + categoryId);
    const price = getGhanaPrice(name);
    const hasDiscount = hash % 4 === 0;
    const compareAtPrice = hasDiscount
      ? Math.round(price * 1.15 * 100) / 100
      : null;
    const stock = 20 + (hash % 280);
    const rating = Math.round((4 + (hash % 10) / 10) * 10) / 10;
    const reviewCount = 10 + (hash % 500);
    const imageUrl = getProductImageThumb(name);
    const imageFull = getProductImage(name);

    return {
      id: `${idPrefix}-${index + 1}`,
      name,
      slug,
      description: `${name} — ${descriptions.long}`,
      short_description: descriptions.short,
      price,
      compare_at_price: compareAtPrice,
      category_id: categoryId,
      image_url: imageUrl,
      images: [imageFull],
      ingredients: null,
      usage_instructions: descriptions.usage,
      stock,
      low_stock_threshold: 15,
      rating,
      review_count: reviewCount,
      is_featured: featuredNames.includes(name) || index < 4,
      is_active: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    };
  });
}
