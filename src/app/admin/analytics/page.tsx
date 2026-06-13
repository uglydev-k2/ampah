"use client";

import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { RevenueOrdersChart, CategoryPieChart, WeeklyOrdersChart } from "@/components/admin/dashboard-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { dashboardKpis, topProducts, categoryBreakdown } from "@/data/admin-data";
import { DollarSign, ShoppingCart, TrendingUp, Percent } from "lucide-react";
import Image from "next/image";

export default function AdminAnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Deep dive into store performance and trends"
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={formatPrice(dashboardKpis.revenue.value)} change={dashboardKpis.revenue.change} icon={DollarSign} iconColor="bg-blue-600" trend={dashboardKpis.revenue.trend} />
        <StatCard label="Orders" value={dashboardKpis.orders.value.toLocaleString()} change={dashboardKpis.orders.change} icon={ShoppingCart} iconColor="bg-emerald-600" trend={dashboardKpis.orders.trend} />
        <StatCard label="Avg. Order" value={formatPrice(dashboardKpis.avgOrder.value)} change={dashboardKpis.avgOrder.change} icon={TrendingUp} iconColor="bg-violet-600" trend={dashboardKpis.avgOrder.trend} />
        <StatCard label="Conversion" value={`${dashboardKpis.conversion.value}%`} change={dashboardKpis.conversion.change} icon={Percent} iconColor="bg-rose-600" trend={dashboardKpis.conversion.trend} />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueOrdersChart />
        </div>
        <CategoryPieChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>This Week&apos;s Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyOrdersChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryBreakdown.slice(0, 6).map((cat) => (
                <div key={cat.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</p>
                      <p className="text-sm font-semibold">{formatPrice(cat.revenue)}</p>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                      <span>{cat.products} products</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Best Sellers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                <span className="text-lg font-bold text-gray-300">#{i + 1}</span>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.sales} sold · {formatPrice(p.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
