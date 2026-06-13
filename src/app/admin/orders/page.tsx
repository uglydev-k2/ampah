"use client";

import { useState } from "react";
import { Search, Eye, LayoutGrid, List } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { OrderKanban } from "@/components/admin/order-kanban";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { useAdminStore } from "@/stores/admin-store";
import type { OrderStatus } from "@/types/database";

const statusVariant: Record<OrderStatus, "success" | "warning" | "info" | "danger" | "default"> = {
  pending: "warning",
  confirmed: "info",
  processing: "info",
  shipped: "success",
  delivered: "success",
  cancelled: "danger",
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"list" | "kanban">("list");
  const orders = useAdminStore((s) => s.orders);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "pending").length;

  return (
    <>
      <PageHeader
        title="Order Management"
        description="Track, filter, and advance orders through fulfillment"
        actions={
          <div className="flex rounded-xl border border-gray-200 p-1 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${view === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
            >
              <List className="h-4 w-4" /> List
            </button>
            <button
              type="button"
              onClick={() => setView("kanban")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${view === "kanban" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
            >
              <LayoutGrid className="h-4 w-4" /> Pipeline
            </button>
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Orders" value={orders.length.toString()} change={8.2} icon={Eye} iconColor="bg-blue-600" index={0} />
        <StatCard label="Pending" value={pending.toString()} change={-2.1} icon={Eye} iconColor="bg-amber-600" index={1} />
        <StatCard label="Revenue (shown)" value={formatPrice(totalRevenue)} change={12.5} icon={Eye} iconColor="bg-emerald-600" index={2} />
      </div>

      {view === "kanban" ? (
        <OrderKanban />
      ) : (
        <>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search orders…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <option value="all">All Statuses</option>
              {(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"] as OrderStatus[]).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {filtered.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md dark:border-gray-800/80 dark:bg-gray-900/80 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-950/20">
                    <span className="text-lg font-bold text-blue-600">#{order.id.replace("o", "")}</span>
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">{order.order_number}</p>
                    <p className="text-sm text-gray-500">{order.customer} · {order.email}</p>
                    <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleString("en-GH")} · {order.items} items</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-lg font-bold">{formatPrice(order.total)}</span>
                  <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                  <Badge variant={order.payment_status === "paid" ? "success" : order.payment_status === "refunded" ? "danger" : "warning"}>
                    {order.payment_status}
                  </Badge>
                  <Button size="sm" variant="outline"><Eye className="h-4 w-4" /> View</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
