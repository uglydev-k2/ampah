"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const customers = [
  { id: "1", name: "Sarah Johnson", email: "sarah@email.com", orders: 12, joined: "2023-03-15" },
  { id: "2", name: "Michael Chen", email: "michael@email.com", orders: 8, joined: "2023-06-22" },
  { id: "3", name: "Emily Rodriguez", email: "emily@email.com", orders: 24, joined: "2022-11-01" },
];

export default function AdminCustomersPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-950 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Back to Dashboard</Link>
        <h1 className="mt-1 mb-6 text-2xl font-bold text-gray-900 dark:text-white">Customer Management</h1>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Orders</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Joined</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.email}</td>
                  <td className="px-4 py-3"><Badge variant="info">{c.orders}</Badge></td>
                  <td className="px-4 py-3 text-gray-500">{c.joined}</td>
                  <td className="px-4 py-3 text-right"><Button size="sm" variant="ghost">View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
