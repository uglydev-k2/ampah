"use client";

import { useState } from "react";
import { User, Package, MapPin, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDate } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "prescriptions", label: "Prescriptions", icon: FileText },
];

const mockOrders = [
  { id: "1", number: "AP-ABC123", date: "2024-12-01", status: "delivered" as const, total: 45.97 },
  { id: "2", number: "AP-DEF456", date: "2024-11-15", status: "shipped" as const, total: 32.50 },
];

const mockPrescriptions = [
  { id: "1", name: "John Doe", date: "2024-12-05", status: "approved" as const },
  { id: "2", name: "John Doe", date: "2024-11-20", status: "fulfilled" as const },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:w-56">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === id ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </nav>

        <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {activeTab === "profile" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <Input label="Full Name" defaultValue="John Doe" />
              <Input label="Email" type="email" defaultValue="john@example.com" />
              <Input label="Phone" defaultValue="+1 (555) 987-6543" />
              <Button>Save Changes</Button>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="mb-4 text-lg font-semibold">Order History</h2>
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.number}</p>
                      <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={order.status === "delivered" ? "success" : "info"}>{order.status}</Badge>
                      <p className="mt-1 text-sm font-medium">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Saved Addresses</h2>
                <Button size="sm">Add Address</Button>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <Badge variant="info" className="mb-2">Default</Badge>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">123 Main St, New York, NY 10001</p>
              </div>
            </div>
          )}

          {activeTab === "prescriptions" && (
            <div>
              <h2 className="mb-4 text-lg font-semibold">Prescription History</h2>
              <div className="space-y-3">
                {mockPrescriptions.map((rx) => (
                  <div key={rx.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                    <div>
                      <p className="font-medium">{rx.name}</p>
                      <p className="text-sm text-gray-500">{formatDate(rx.date)}</p>
                    </div>
                    <Badge variant={rx.status === "approved" ? "success" : "info"}>{rx.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
