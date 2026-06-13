"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminMeshBg } from "@/components/admin/admin-mesh-bg";
import { AdminProvider } from "@/components/admin/admin-provider";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/stores/admin-store";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const collapsed = useAdminStore((s) => s.sidebarCollapsed);

  return (
    <AdminProvider>
      <div className="relative flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <AdminMeshBg />
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className={cn("relative flex min-w-0 flex-1 flex-col transition-all duration-300", collapsed ? "lg:ml-0" : "")}>
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="relative flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
