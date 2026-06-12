"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const orders = [
  { id: "1", number: "AP-001", customer: "Sarah Johnson", total: 45.97, status: "processing" as const, date: "2024-12-10" },
  { id: "2", number: "AP-002", customer: "Michael Chen", total: 89.50, status: "shipped" as const, date: "2024-12-09" },
  { id: "3", number: "AP-003", customer: "Emily Rodriguez", total: 32.00, status: "pending" as const, date: "2024-12-10" },
];

export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-950 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Back to Dashboard</Link>
        <h1 className="mt-1 mb-6 text-2xl font-bold text-gray-900 dark:text-white">Order Management</h1>
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-900">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{order.number}</p>
                <p className="text-sm text-gray-500">{order.customer} · {order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">{formatPrice(order.total)}</span>
                <Badge variant={order.status === "shipped" ? "success" : order.status === "pending" ? "warning" : "info"}>
                  {order.status}
                </Badge>
                <Button size="sm" variant="outline">Update</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
