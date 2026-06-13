"use client";

import { useState } from "react";
import { Plus, Package } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleCategories, sampleProducts } from "@/data/sample-data";

export default function AdminCategoriesPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        title="Categories"
        description="Organize your product catalog"
        actions={<Button><Plus className="h-4 w-4" /> Add Category</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleCategories.map((cat) => {
          const count = sampleProducts.filter((p) => p.category_id === cat.id).length;
          const active = selected === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelected(active ? null : cat.id)}
              className={`rounded-2xl border p-5 text-left transition-all hover:shadow-md ${
                active
                  ? "border-blue-500 bg-blue-50 shadow-md dark:border-blue-600 dark:bg-blue-950/30"
                  : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
              }`}
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-gray-500">{cat.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="info">{count} products</Badge>
                <span className="text-xs text-gray-400">/{cat.slug}</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
