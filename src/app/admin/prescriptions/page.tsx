"use client";

import { useState } from "react";
import { Check, X, FileText, Download, Clock } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/stores/admin-store";
import type { PrescriptionStatus } from "@/types/database";

const statusVariant: Record<PrescriptionStatus, "success" | "warning" | "danger" | "info"> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  fulfilled: "info",
};

export default function AdminPrescriptionsPage() {
  const [filter, setFilter] = useState<PrescriptionStatus | "all">("all");
  const prescriptions = useAdminStore((s) => s.prescriptions);
  const approve = useAdminStore((s) => s.approvePrescription);
  const reject = useAdminStore((s) => s.rejectPrescription);
  const addToast = useAdminStore((s) => s.addToast);

  const filtered = prescriptions.filter((r) => filter === "all" || r.status === filter);
  const pending = prescriptions.filter((r) => r.status === "pending").length;
  const approved = prescriptions.filter((r) => r.status === "approved").length;

  return (
    <>
      <PageHeader title="Prescription Approval" description="Review and approve uploaded prescriptions" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Pending Review" value={pending.toString()} change={-5.2} icon={Clock} iconColor="bg-amber-600" index={0} />
        <StatCard label="Approved" value={approved.toString()} change={12.0} icon={Check} iconColor="bg-emerald-600" index={1} />
        <StatCard label="Total Submissions" value={prescriptions.length.toString()} change={8.1} icon={FileText} iconColor="bg-blue-600" index={2} />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filter === s
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((rx) => (
          <div
            key={rx.id}
            className="rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-gray-800/80 dark:bg-gray-900/80"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-900/30 dark:to-orange-950/20">
                  <FileText className="h-7 w-7 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{rx.patient_name}</p>
                  <p className="text-sm text-gray-500">{rx.phone}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(rx.created_at).toLocaleString("en-GH")} · {rx.file_name}
                  </p>
                  {rx.notes && <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">{rx.notes}</p>}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={statusVariant[rx.status]}>{rx.status}</Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addToast({ title: "Opening file", message: rx.file_name, type: "info" })}
                >
                  <Download className="h-4 w-4" /> View File
                </Button>
                {rx.status === "pending" && (
                  <>
                    <Button size="sm" variant="secondary" onClick={() => approve(rx.id)}>
                      <Check className="h-4 w-4" /> Approve
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => reject(rx.id)}>
                      <X className="h-4 w-4" /> Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
