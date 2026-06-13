"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/stores/admin-store";

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const colors = {
  success: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50",
  error: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50",
  info: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50",
};

const iconColors = {
  success: "text-emerald-600",
  error: "text-red-600",
  info: "text-blue-600",
};

export function AdminToastStack() {
  const toasts = useAdminStore((s) => s.toasts);
  const removeToast = useAdminStore((s) => s.removeToast);

  return (
    <div className="fixed bottom-6 right-6 z-[110] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              className={cn(
                "flex min-w-[280px] items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md",
                colors[toast.type]
              )}
            >
              <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColors[toast.type])} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{toast.title}</p>
                {toast.message && <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">{toast.message}</p>}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-lg p-1 text-gray-400 hover:bg-black/5"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
