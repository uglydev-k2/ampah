"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { id: "1", title: "Low Stock Alert", message: "Ibuprofen 200mg is below threshold (150 remaining)", type: "warning" as const, read: false, date: "2024-12-10" },
  { id: "2", title: "New Order", message: "Order AP-003 received from Emily Rodriguez", type: "info" as const, read: false, date: "2024-12-10" },
  { id: "3", title: "Prescription Pending", message: "New prescription upload from John Doe", type: "warning" as const, read: true, date: "2024-12-09" },
  { id: "4", title: "Order Delivered", message: "Order AP-001 successfully delivered", type: "success" as const, read: true, date: "2024-12-08" },
];

export default function AdminNotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-950 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Back to Dashboard</Link>
        <h1 className="mt-1 mb-6 text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className={`rounded-2xl border p-4 ${n.read ? "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900" : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 dark:text-white">{n.title}</p>
                    {!n.read && <Badge variant="info">New</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{n.message}</p>
                </div>
                <Badge variant={n.type === "success" ? "success" : n.type === "warning" ? "warning" : "info"}>{n.type}</Badge>
              </div>
              <p className="mt-2 text-xs text-gray-400">{n.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
