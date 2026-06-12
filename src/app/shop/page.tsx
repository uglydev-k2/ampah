"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sampleProducts, sampleCategories } from "@/data/sample-data";
import { useWishlistStore } from "@/stores/wishlist-store";

const ITEMS_PER_PAGE = 8;
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A-Z" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  const wishlistMode = searchParams.get("wishlist") === "true";
  const wishlistItems = useWishlistStore((s) => s.items);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let products = [...sampleProducts];

    if (wishlistMode) {
      products = products.filter((p) => wishlistItems.includes(p.id));
    }

    if (selectedCategory) {
      const cat = sampleCategories.find((c) => c.slug === selectedCategory);
      if (cat) products = products.filter((p) => p.category_id === cat.id);
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc": products.sort((a, b) => a.price - b.price); break;
      case "price-desc": products.sort((a, b) => b.price - a.price); break;
      case "rating": products.sort((a, b) => b.rating - a.rating); break;
      case "name": products.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: products.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    return products;
  }, [search, sort, selectedCategory, wishlistMode, wishlistItems]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {wishlistMode ? "My Wishlist" : "Shop All Products"}
        </h1>
        <p className="mt-1 text-gray-500">{filtered.length} products found</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-10"
            aria-label="Search products"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900"
          aria-label="Sort products"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="flex gap-8">
        <aside className={`w-56 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
          <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Categories</h3>
          <div className="space-y-1">
            <button
              onClick={() => { setSelectedCategory(""); setPage(1); }}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${!selectedCategory ? "bg-blue-50 font-medium text-blue-600 dark:bg-blue-950" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"}`}
            >
              All Categories
            </button>
            {sampleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedCategory === cat.slug ? "bg-blue-50 font-medium text-blue-600 dark:bg-blue-950" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1">
          {paginated.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try adjusting your search or filters."
              actionLabel="View All Products"
              actionHref="/shop"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button key={i} variant={page === i + 1 ? "primary" : "ghost"} size="sm" onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-8"><ProductGridSkeleton /></div>}>
      <ShopContent />
    </Suspense>
  );
}
