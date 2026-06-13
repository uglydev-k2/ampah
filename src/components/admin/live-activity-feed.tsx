"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminActivities } from "@/data/admin-data";

const activityColors: Record<string, string> = {
  order: "bg-blue-500 shadow-blue-500/50",
  prescription: "bg-amber-500 shadow-amber-500/50",
  product: "bg-emerald-500 shadow-emerald-500/50",
  customer: "bg-purple-500 shadow-purple-500/50",
  system: "bg-gray-500 shadow-gray-500/50",
};

export function LiveActivityFeed() {
  return (
    <Card className="border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Live Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gray-200 dark:bg-gray-700" />
          {adminActivities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative flex gap-3 pb-4 last:pb-0"
            >
              <div
                className={`relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full shadow-lg ${activityColors[activity.type]}`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                <p className="truncate text-xs text-gray-500">{activity.detail}</p>
                <p className="mt-0.5 text-[10px] text-gray-400">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
