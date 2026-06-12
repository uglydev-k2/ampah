"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const prescriptions = [
  { id: "1", name: "John Doe", phone: "+1 555-0101", date: "2024-12-10", status: "pending" as const },
  { id: "2", name: "Jane Smith", phone: "+1 555-0102", date: "2024-12-09", status: "pending" as const },
  { id: "3", name: "Robert Lee", phone: "+1 555-0103", date: "2024-12-08", status: "approved" as const },
];

export default function AdminPrescriptionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-950 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Back to Dashboard</Link>
        <h1 className="mt-1 mb-6 text-2xl font-bold text-gray-900 dark:text-white">Prescription Approval</h1>
        <div className="space-y-3">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-900">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{rx.name}</p>
                <p className="text-sm text-gray-500">{rx.phone} · {rx.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={rx.status === "approved" ? "success" : "warning"}>{rx.status}</Badge>
                {rx.status === "pending" && (
                  <>
                    <Button size="sm" variant="secondary"><Check className="h-4 w-4" /> Approve</Button>
                    <Button size="sm" variant="danger"><X className="h-4 w-4" /> Reject</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
