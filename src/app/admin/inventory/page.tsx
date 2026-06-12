"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { sampleProducts } from "@/data/sample-data";

export default function AdminInventoryPage() {
  const sorted = [...sampleProducts].sort((a, b) => a.stock - b.stock);

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-950 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Back to Dashboard</Link>
        <h1 className="mt-1 mb-6 text-2xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Product</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Stock</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Threshold</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Value</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">{p.low_stock_threshold}</td>
                  <td className="px-4 py-3">
                    <Badge variant={p.stock <= p.low_stock_threshold ? "warning" : "success"}>
                      {p.stock <= p.low_stock_threshold ? "Low Stock" : "In Stock"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{formatPrice(p.price * p.stock)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
