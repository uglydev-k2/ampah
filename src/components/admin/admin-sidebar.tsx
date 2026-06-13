"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { adminNavItems } from "@/components/admin/admin-nav";
import { useAdminStore } from "@/stores/admin-store";
import { Pill, X, ChevronLeft, ChevronRight } from "lucide-react";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const collapsed = useAdminStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAdminStore((s) => s.toggleSidebar);
  const badges = useAdminStore((s) => s.badgeCounts());

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const getBadge = (href: string) => {
    if (href === "/admin/orders") return badges.pendingOrders;
    if (href === "/admin/inventory") return badges.lowStock;
    if (href === "/admin/prescriptions") return badges.pendingRx;
    if (href === "/admin/notifications") return badges.unreadNotifications;
    return undefined;
  };

  const NavLink = ({ href, label, icon: Icon }: (typeof adminNavItems)[0]) => {
    const badge = getBadge(href);
    const active = isActive(href);
    return (
      <Link
        href={href}
        onClick={onClose}
        title={collapsed ? label : undefined}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          active
            ? "bg-gradient-to-r from-blue-600/25 to-blue-600/10 text-blue-400 shadow-inner ring-1 ring-blue-500/20"
            : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
        )}
      >
        <Icon className={cn("h-4 w-4 shrink-0", active && "text-blue-400")} />
        {!collapsed && <span className="flex-1">{label}</span>}
        {!collapsed && badge !== undefined && badge > 0 && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold text-white",
              href.includes("prescription") ? "bg-amber-500" : "bg-blue-600"
            )}
          >
            {badge}
          </span>
        )}
        {collapsed && badge !== undefined && badge > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </Link>
    );
  };

  const nav = (
    <>
      <div className={cn("flex items-center px-4 py-5", collapsed ? "justify-center" : "justify-between px-5")}>
        {!collapsed ? (
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/40">
              <Pill className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{siteConfig.name}</p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">Command Center</p>
            </div>
          </Link>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/40">
            <Pill className="h-5 w-5 text-white" />
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {!collapsed && (
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Main</p>
        )}
        {adminNavItems.slice(0, 6).map((item) => (
          <NavLink key={item.href} {...item} />
        ))}

        {!collapsed && (
          <p className="mb-2 mt-5 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Manage</p>
        )}
        {adminNavItems.slice(6).map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>

      {!collapsed && (
        <div className="border-t border-slate-800/80 p-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600/15 via-slate-900 to-emerald-600/10 p-4 ring-1 ring-white/5">
            <p className="text-xs font-semibold text-white">Pharmacy Status</p>
            <p className="mt-1 text-[11px] text-slate-400">All systems operational</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-medium text-emerald-400">Live</span>
              </div>
              <span className="text-[10px] text-slate-500">{badges.pendingOrders} active orders</span>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggleSidebar}
        className="hidden border-t border-slate-800/80 p-3 text-slate-500 transition-colors hover:text-white lg:flex lg:items-center lg:justify-center"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </>
  );

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-800/50 bg-slate-950 transition-all duration-300 lg:static",
          collapsed ? "w-[72px]" : "w-72",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {nav}
      </aside>
    </>
  );
}
