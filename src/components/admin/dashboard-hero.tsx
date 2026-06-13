"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, FileText, Plus, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useAdminStore } from "@/stores/admin-store";
import { dashboardKpis } from "@/data/admin-data";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardHero() {
  const [time, setTime] = useState("");
  const badgeCounts = useAdminStore((s) => s.badgeCounts());
  const pendingRx = useAdminStore((s) => s.prescriptions.filter((r) => r.status === "pending").length);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GH", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-8 overflow-hidden rounded-3xl border border-gray-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 shadow-xl dark:border-slate-800 lg:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-emerald-600/10" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">Command Center</span>
          </div>
          <h1 className="text-2xl font-bold text-white lg:text-3xl">
            {getGreeting()}, Admin
          </h1>
          <p className="mt-2 max-w-lg text-sm text-slate-400">
            {badgeCounts.pendingOrders} orders need attention · {pendingRx} prescriptions awaiting review ·{" "}
            {formatPrice(dashboardKpis.revenue.value)} revenue this month
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="info" className="bg-blue-600/30 text-blue-200">
              <TrendingUp className="mr-1 h-3 w-3" /> +{dashboardKpis.revenue.change}% revenue
            </Badge>
            <Badge variant="success" className="bg-emerald-600/20 text-emerald-300">
              Systems operational
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <Clock className="h-5 w-5 text-blue-400" />
            <span className="font-mono text-xl font-bold tabular-nums text-white">{time}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/products">
              <Button size="sm" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </Link>
            <Link href="/admin/prescriptions">
              <Button size="sm" className="bg-blue-600 shadow-lg shadow-blue-600/30 hover:bg-blue-500">
                <FileText className="h-4 w-4" /> Review Rx ({pendingRx})
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
