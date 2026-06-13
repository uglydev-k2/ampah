"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
  trend?: number[];
  index?: number;
}

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  iconColor = "bg-blue-600",
  trend,
  index = 0,
}: StatCardProps) {
  const positive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800/80 dark:bg-gray-900/80"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 transition-all group-hover:from-blue-600/[0.03] group-hover:to-transparent" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</p>
          <div className="mt-2 flex items-center gap-1">
            {positive ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-500" />
            )}
            <span className={cn("text-xs font-semibold", positive ? "text-emerald-600" : "text-red-500")}>
              {positive ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg", iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && trend.length > 1 && (
        <div className="relative mt-4 flex h-10 items-end gap-0.5">
          {trend.map((v, i) => {
            const max = Math.max(...trend);
            const height = max > 0 ? (v / max) * 100 : 0;
            return (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-blue-200 to-blue-100 transition-all group-hover:from-blue-300 group-hover:to-blue-200 dark:from-blue-900/60 dark:to-blue-900/30"
                style={{ height: `${Math.max(height, 10)}%` }}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
