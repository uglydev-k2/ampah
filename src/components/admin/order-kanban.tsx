"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useAdminStore } from "@/stores/admin-store";
import type { OrderStatus } from "@/types/database";

const columns: { status: OrderStatus; label: string; color: string }[] = [
  { status: "pending", label: "Pending", color: "border-amber-400/50 bg-amber-50/50 dark:bg-amber-950/20" },
  { status: "confirmed", label: "Confirmed", color: "border-blue-400/50 bg-blue-50/50 dark:bg-blue-950/20" },
  { status: "processing", label: "Processing", color: "border-violet-400/50 bg-violet-50/50 dark:bg-violet-950/20" },
  { status: "shipped", label: "Shipped", color: "border-emerald-400/50 bg-emerald-50/50 dark:bg-emerald-950/20" },
];

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "confirmed",
  confirmed: "processing",
  processing: "shipped",
};

export function OrderKanban() {
  const orders = useAdminStore((s) => s.orders);
  const updateStatus = useAdminStore((s) => s.updateOrderStatus);

  return (
    <Card className="overflow-hidden border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <div>
          <CardTitle>Order Fulfillment Pipeline</CardTitle>
          <p className="text-sm text-gray-500">Drag-free workflow — click to advance status</p>
        </div>
        <Link href="/admin/orders" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
          Full view <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent className="overflow-x-auto p-4">
        <div className="flex min-w-[800px] gap-4">
          {columns.map((col) => {
            const colOrders = orders.filter((o) => o.status === col.status);
            return (
              <div key={col.status} className="flex-1">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{col.label}</span>
                  <Badge variant="default">{colOrders.length}</Badge>
                </div>
                <div className="space-y-2">
                  {colOrders.map((order, i) => (
                    <motion.button
                      key={order.id}
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        const next = nextStatus[order.status];
                        if (next) updateStatus(order.id, next);
                      }}
                      className={`w-full rounded-xl border p-3 text-left transition-all hover:shadow-md ${col.color} ${nextStatus[order.status] ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <p className="font-mono text-[10px] font-bold text-gray-700 dark:text-gray-300">{order.order_number}</p>
                        {nextStatus[order.status] && (
                          <GripVertical className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                        )}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{order.customer}</p>
                      <p className="mt-1 text-xs font-bold text-blue-600">{formatPrice(order.total)}</p>
                      <p className="mt-1 text-[10px] text-gray-500">{order.items} items</p>
                    </motion.button>
                  ))}
                  {colOrders.length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center text-xs text-gray-400 dark:border-gray-700">
                      No orders
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
