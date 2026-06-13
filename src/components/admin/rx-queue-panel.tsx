"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStore } from "@/stores/admin-store";

export function RxQueuePanel() {
  const prescriptions = useAdminStore((s) => s.prescriptions);
  const approve = useAdminStore((s) => s.approvePrescription);
  const reject = useAdminStore((s) => s.rejectPrescription);
  const pending = prescriptions.filter((r) => r.status === "pending");

  return (
    <Card className="border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Prescription Queue</CardTitle>
        <Badge variant="warning">{pending.length} pending</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {pending.slice(0, 4).map((rx, i) => (
          <motion.div
            key={rx.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-amber-100 bg-gradient-to-r from-amber-50/80 to-orange-50/40 p-3 dark:border-amber-900/30 dark:from-amber-950/30 dark:to-orange-950/20"
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{rx.patient_name}</p>
            <p className="text-xs text-gray-500">{rx.file_name}</p>
            {rx.notes && <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{rx.notes}</p>}
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="secondary" className="h-7 flex-1 text-xs" onClick={() => approve(rx.id)}>
                <Check className="h-3 w-3" /> Approve
              </Button>
              <Button size="sm" variant="danger" className="h-7 flex-1 text-xs" onClick={() => reject(rx.id)}>
                <X className="h-3 w-3" /> Reject
              </Button>
            </div>
          </motion.div>
        ))}
        {pending.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-500">All prescriptions reviewed</p>
        )}
        <Link href="/admin/prescriptions" className="block text-center text-sm font-medium text-blue-600 hover:underline">
          Open prescription center →
        </Link>
      </CardContent>
    </Card>
  );
}
