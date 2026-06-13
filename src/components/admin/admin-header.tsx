"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Search, Sun, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPageTitle } from "@/components/admin/admin-nav";
import { NotificationDropdown } from "@/components/admin/notification-dropdown";
import { useThemeStore } from "@/stores/theme-store";
import { useAdminStore } from "@/stores/admin-store";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  const setCommandOpen = useAdminStore((s) => s.setCommandOpen);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200/80 bg-white/70 px-4 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/70 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{getPageTitle(pathname)}</h1>
        <p className="hidden text-xs text-gray-500 sm:block">
          {new Date().toLocaleDateString("en-GH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-800 md:flex"
      >
        <Search className="h-4 w-4 text-gray-400" />
        <span className="w-52 text-left text-sm text-gray-400">Search anything…</span>
        <kbd className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-400 dark:border-gray-700">⌘K</kbd>
      </button>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <NotificationDropdown />

        <Link href="/shop" className="hidden sm:inline-flex">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4" />
            Storefront
          </Button>
        </Link>

        <div className="ml-1 flex items-center gap-2 rounded-xl border border-gray-200/80 py-1 pl-1 pr-3 dark:border-gray-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-emerald-600 text-xs font-bold text-white shadow-md shadow-blue-600/20">
            AD
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-900 dark:text-white">Admin</p>
            <p className="text-[10px] text-gray-500">Pharmacist</p>
          </div>
        </div>
      </div>
    </header>
  );
}
