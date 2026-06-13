"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Warehouse,
  BarChart3,
  Bell,
  Search,
  ArrowRight,
} from "lucide-react";
import { useAdminStore } from "@/stores/admin-store";
import { adminNavItems } from "@/components/admin/admin-nav";
import { sampleProducts } from "@/data/sample-data";
import { adminCustomers } from "@/data/admin-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "/admin": LayoutDashboard,
  "/admin/analytics": BarChart3,
  "/admin/orders": ShoppingCart,
  "/admin/products": Package,
  "/admin/inventory": Warehouse,
  "/admin/customers": Users,
  "/admin/prescriptions": FileText,
  "/admin/notifications": Bell,
};

export function CommandPalette() {
  const router = useRouter();
  const { commandOpen, setCommandOpen } = useAdminStore();
  const orders = useAdminStore((s) => s.orders);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(!useAdminStore.getState().commandOpen);
      }
      if (e.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCommandOpen]);

  const navResults = adminNavItems.map((item) => ({
    id: item.href,
    label: item.label,
    sub: "Navigate",
    href: item.href,
    icon: iconMap[item.href] ?? LayoutDashboard,
  }));

  const orderResults = orders.slice(0, 4).map((o) => ({
    id: o.id,
    label: o.order_number,
    sub: `${o.customer} · GH₵${o.total}`,
    href: "/admin/orders",
    icon: ShoppingCart,
  }));

  const productResults = sampleProducts.slice(0, 4).map((p) => ({
    id: p.id,
    label: p.name,
    sub: `Stock: ${p.stock}`,
    href: "/admin/products",
    icon: Package,
  }));

  const customerResults = adminCustomers.slice(0, 3).map((c) => ({
    id: c.id,
    label: c.name,
    sub: c.email,
    href: "/admin/customers",
    icon: Users,
  }));

  const results = [...navResults, ...orderResults, ...productResults, ...customerResults];

  return (
    <AnimatePresence>
      {commandOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setCommandOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="fixed left-1/2 top-[15%] z-[101] w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  autoFocus
                  placeholder="Search pages, orders, products, customers…"
                  className="flex-1 bg-transparent text-sm outline-none dark:text-white"
                />
                <kbd className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-400 dark:border-gray-700">ESC</kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Quick Access</p>
                {results.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={`${item.href}-${item.id}`}
                      type="button"
                      onClick={() => {
                        router.push(item.href);
                        setCommandOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
                        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="truncate text-xs text-gray-500">{item.sub}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-gray-300" />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
