"use client";

import Link from "next/link";
import Image from "next/image";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Percent,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { DashboardHero } from "@/components/admin/dashboard-hero";
import { OrderKanban } from "@/components/admin/order-kanban";
import { LiveActivityFeed } from "@/components/admin/live-activity-feed";
import { RxQueuePanel } from "@/components/admin/rx-queue-panel";
import { PerformanceRings } from "@/components/admin/performance-rings";
import {
  RevenueOrdersChart,
  CategoryPieChart,
  HourlyTrafficChart,
} from "@/components/admin/dashboard-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useAdminStore } from "@/stores/admin-store";
import { dashboardKpis, topProducts, lowStockProducts } from "@/data/admin-data";

const statusVariant: Record<string, "success" | "warning" | "info" | "danger" | "default"> = {
  pending: "warning",
  confirmed: "info",
  processing: "info",
  shipped: "success",
  delivered: "success",
  cancelled: "danger",
};

export default function AdminDashboardPage() {
  const orders = useAdminStore((s) => s.orders);

  return (
    <>
      <DashboardHero />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Total Revenue" value={formatPrice(dashboardKpis.revenue.value)} change={dashboardKpis.revenue.change} icon={DollarSign} iconColor="bg-blue-600 shadow-blue-600/30" trend={dashboardKpis.revenue.trend} index={0} />
        <StatCard label="Total Orders" value={dashboardKpis.orders.value.toLocaleString()} change={dashboardKpis.orders.change} icon={ShoppingCart} iconColor="bg-emerald-600 shadow-emerald-600/30" trend={dashboardKpis.orders.trend} index={1} />
        <StatCard label="Customers" value={dashboardKpis.customers.value.toLocaleString()} change={dashboardKpis.customers.change} icon={Users} iconColor="bg-violet-600 shadow-violet-600/30" trend={dashboardKpis.customers.trend} index={2} />
        <StatCard label="Products" value={dashboardKpis.products.value.toString()} change={dashboardKpis.products.change} icon={Package} iconColor="bg-amber-600 shadow-amber-600/30" trend={dashboardKpis.products.trend} index={3} />
        <StatCard label="Avg. Order Value" value={formatPrice(dashboardKpis.avgOrder.value)} change={dashboardKpis.avgOrder.change} icon={TrendingUp} iconColor="bg-cyan-600 shadow-cyan-600/30" trend={dashboardKpis.avgOrder.trend} index={4} />
        <StatCard label="Conversion Rate" value={`${dashboardKpis.conversion.value}%`} change={dashboardKpis.conversion.change} icon={Percent} iconColor="bg-rose-600 shadow-rose-600/30" trend={dashboardKpis.conversion.trend} index={5} />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <RevenueOrdersChart />
        </div>
        <div className="space-y-6 lg:col-span-5">
          <PerformanceRings />
          <HourlyTrafficChart />
        </div>
      </div>

      <div className="mb-8">
        <OrderKanban />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CategoryPieChart />
        </div>
        <LiveActivityFeed />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <Card className="border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <p className="text-sm text-gray-500">Latest transactions across the store</p>
            </div>
            <Link href="/admin/orders" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0 pb-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Order</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Total</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50/80 dark:border-gray-800/50 dark:hover:bg-gray-800/30">
                    <td className="px-6 py-3.5 font-mono text-xs font-semibold text-gray-900 dark:text-white">{order.order_number}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.items} items</p>
                    </td>
                    <td className="px-4 py-3.5 font-semibold">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={statusVariant[order.status] ?? "default"}>{order.status}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={order.payment_status === "paid" ? "success" : order.payment_status === "refunded" ? "danger" : "warning"}>
                        {order.payment_status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <RxQueuePanel />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Products</CardTitle>
            <Link href="/admin/products" className="text-xs text-blue-600 hover:underline">See all</Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 text-xs font-bold text-blue-700 dark:from-blue-900/40 dark:to-blue-950/20 dark:text-blue-400">
                    {i + 1}
                  </span>
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.sales} sold · {formatPrice(p.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Low Stock Alerts
            </CardTitle>
            <Link href="/admin/inventory" className="text-xs text-blue-600 hover:underline">Manage</Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockProducts.slice(0, 6).map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-2 rounded-xl border border-red-100 bg-red-50/50 p-3 dark:border-red-900/30 dark:bg-red-950/20">
                  <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">{p.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:block">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                        style={{ width: `${Math.min((p.stock / p.low_stock_threshold) * 100, 100)}%` }}
                      />
                    </div>
                    <Badge variant="warning">{p.stock} left</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
