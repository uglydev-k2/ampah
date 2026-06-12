"use client";

import Link from "next/link";
import {
  LayoutDashboard, Package, FolderOpen, Warehouse, ShoppingCart,
  Users, FileText, Bell, BarChart3,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { adminStats, sampleProducts } from "@/data/sample-data";
import { siteConfig } from "@/config/site";

const sidebarLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/prescriptions", label: "Prescriptions", icon: FileText },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
];

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Revenue", value: formatPrice(adminStats.totalRevenue), change: "+12.5%" },
    { label: "Total Orders", value: adminStats.totalOrders.toLocaleString(), change: "+8.2%" },
    { label: "Customers", value: adminStats.totalCustomers.toLocaleString(), change: "+15.1%" },
    { label: "Products", value: adminStats.totalProducts.toString(), change: "+3" },
  ];

  const lowStock = sampleProducts.filter((p) => p.stock <= p.low_stock_threshold);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 lg:block">
        <Link href="/" className="mb-6 block text-lg font-bold text-blue-600">{siteConfig.name}</Link>
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Admin Panel</p>
        <nav className="space-y-1">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-emerald-600">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Revenue Chart</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={adminStats.revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => formatPrice(Number(value))} />
                  <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Pending Prescriptions</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-amber-600">{adminStats.pendingPrescriptions}</span>
                  <Link href="/admin/prescriptions" className="text-sm text-blue-600 hover:underline">Review All →</Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Low Stock Alerts</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lowStock.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{p.name}</span>
                      <Badge variant="warning">{p.stock} left</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
