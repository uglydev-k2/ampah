"use client";

import { Plus, Tag, Copy } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { adminCoupons } from "@/data/admin-data";

export default function AdminCouponsPage() {
  const active = adminCoupons.filter((c) => c.is_active).length;
  const totalUsage = adminCoupons.reduce((s, c) => s + c.usage_count, 0);

  return (
    <>
      <PageHeader
        title="Coupons & Discounts"
        description="Manage promotional codes and discounts"
        actions={<Button><Plus className="h-4 w-4" /> Create Coupon</Button>}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Active Coupons" value={active.toString()} change={0} icon={Tag} iconColor="bg-blue-600" />
        <StatCard label="Total Redemptions" value={totalUsage.toLocaleString()} change={18.4} icon={Tag} iconColor="bg-emerald-600" />
        <StatCard label="Total Coupons" value={adminCoupons.length.toString()} change={0} icon={Tag} iconColor="bg-violet-600" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {adminCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-600/5" />
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl font-bold text-blue-600">{coupon.code}</span>
                  <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Copy code">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {coupon.discount_type === "percentage"
                    ? `${coupon.discount_value}% off`
                    : `${formatPrice(coupon.discount_value)} off`}
                </p>
              </div>
              <Badge variant={coupon.is_active ? "success" : "default"}>
                {coupon.is_active ? "Active" : "Expired"}
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
              <div>
                <p className="text-xs text-gray-500">Used</p>
                <p className="font-bold">{coupon.usage_count}{coupon.usage_limit ? ` / ${coupon.usage_limit}` : ""}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Expires</p>
                <p className="font-bold">{coupon.expires_at ?? "Never"}</p>
              </div>
            </div>
            {coupon.usage_limit && (
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${Math.min((coupon.usage_count / coupon.usage_limit) * 100, 100)}%` }}
                />
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Edit</Button>
              <Button size="sm" variant="ghost" className="text-red-500">Deactivate</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
