import type { Product } from "@/types/database";
import { slugify } from "@/lib/utils";

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
  images: string[];
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
  images,
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
    const price = Math.round((5.99 + (hash % 4500) / 100) * 100) / 100;
    const hasDiscount = hash % 3 === 0;
    const compareAtPrice = hasDiscount
      ? Math.round(price * 1.25 * 100) / 100
      : null;
    const stock = 20 + (hash % 280);
    const rating = Math.round((4 + (hash % 10) / 10) * 10) / 10;
    const reviewCount = 10 + (hash % 500);
    const image = images[index % images.length];

    return {
      id: `${idPrefix}-${index + 1}`,
      name,
      slug,
      description: `${name} — ${descriptions.long}`,
      short_description: descriptions.short,
      price,
      compare_at_price: compareAtPrice,
      category_id: categoryId,
      image_url: `${image}?w=400&h=400&fit=crop`,
      images: [`${image}?w=800&h=800&fit=crop`],
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
