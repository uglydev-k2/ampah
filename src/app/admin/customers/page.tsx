"use client";

import { useState } from "react";
import { Search, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { adminCustomers } from "@/data/admin-data";
import { Users, UserCheck, UserX } from "lucide-react";

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const filtered = adminCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const active = adminCustomers.filter((c) => c.status === "active").length;
  const totalSpent = adminCustomers.reduce((s, c) => s + c.spent, 0);

  return (
    <>
      <PageHeader title="Customers" description="Manage your customer base" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Customers" value={adminCustomers.length.toString()} change={15.1} icon={Users} iconColor="bg-blue-600" />
        <StatCard label="Active" value={active.toString()} change={8.3} icon={UserCheck} iconColor="bg-emerald-600" />
        <StatCard label="Total Spent" value={formatPrice(totalSpent)} change={11.2} icon={UserX} iconColor="bg-violet-600" />
      </div>

      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search customers…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((customer) => (
          <div
            key={customer.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 text-sm font-bold text-white">
                {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <Badge variant={customer.status === "active" ? "success" : "default"}>{customer.status}</Badge>
            </div>
            <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
            <div className="mt-2 space-y-1 text-xs text-gray-500">
              <p className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{customer.email}</p>
              <p className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{customer.phone}</p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
              <div>
                <p className="text-xs text-gray-500">Orders</p>
                <p className="font-bold text-gray-900 dark:text-white">{customer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Spent</p>
                <p className="font-bold text-emerald-600">{formatPrice(customer.spent)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-xs font-medium">{customer.joined}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="mt-4 w-full">View Profile</Button>
          </div>
        ))}
      </div>
    </>
  );
}
