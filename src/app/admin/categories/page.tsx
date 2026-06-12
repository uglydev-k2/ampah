"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleCategories } from "@/data/sample-data";

export default function AdminCategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-950 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Back to Dashboard</Link>
            <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Category Management</h1>
          </div>
          <Button><Plus className="h-4 w-4" /> Add Category</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCategories.map((cat) => (
            <div key={cat.id} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{cat.description}</p>
              <p className="mt-2 text-xs text-gray-400">/{cat.slug}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
