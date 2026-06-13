"use client";

import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, PackageX } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { sampleProducts } from "@/data/sample-data";

export default function AdminInventoryPage() {
  const [search, setSearch] = useState("");
  const sorted = [...sampleProducts].sort((a, b) => a.stock - b.stock);
  const filtered = sorted.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const lowStock = sampleProducts.filter((p) => p.stock <= p.low_stock_threshold).length;
  const outOfStock = sampleProducts.filter((p) => p.stock === 0).length;
  const totalValue = sampleProducts.reduce((s, p) => s + p.price * p.stock, 0);
  const inStock = sampleProducts.length - outOfStock;

  return (
    <>
      <PageHeader title="Inventory Management" description="Monitor stock levels and inventory value" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total SKUs" value={sampleProducts.length.toString()} change={2.1} icon={PackageX} iconColor="bg-blue-600" />
        <StatCard label="In Stock" value={inStock.toString()} change={1.5} icon={CheckCircle} iconColor="bg-emerald-600" />
        <StatCard label="Low Stock" value={lowStock.toString()} change={-3.2} icon={AlertTriangle} iconColor="bg-amber-600" />
        <StatCard label="Inventory Value" value={formatPrice(totalValue)} change={8.4} icon={CheckCircle} iconColor="bg-violet-600" />
      </div>

      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search inventory…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Product</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Stock Level</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Threshold</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 30).map((p) => {
                const pct = Math.min((p.stock / (p.low_stock_threshold * 2)) * 100, 100);
                const status = p.stock === 0 ? "danger" : p.stock <= p.low_stock_threshold ? "warning" : "success";
                const label = p.stock === 0 ? "Out of Stock" : p.stock <= p.low_stock_threshold ? "Low Stock" : "In Stock";
                return (
                  <tr key={p.id} className="border-b border-gray-50 dark:border-gray-800/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{p.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className={`h-full rounded-full ${status === "success" ? "bg-emerald-500" : status === "warning" ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-semibold">{p.stock}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{p.low_stock_threshold}</td>
                    <td className="px-4 py-3"><Badge variant={status}>{label}</Badge></td>
                    <td className="px-4 py-3 font-medium">{formatPrice(p.price * p.stock)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
