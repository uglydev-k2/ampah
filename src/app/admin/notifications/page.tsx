"use client";

import { Bell, CheckCheck, Package, FileText, AlertTriangle, Settings } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/stores/admin-store";

const typeIcons = {
  order: Package,
  prescription: FileText,
  inventory: AlertTriangle,
  system: Settings,
};

const typeColors = {
  order: "bg-blue-100 text-blue-600 dark:bg-blue-900/40",
  prescription: "bg-amber-100 text-amber-600 dark:bg-amber-900/40",
  inventory: "bg-red-100 text-red-600 dark:bg-red-900/40",
  system: "bg-gray-100 text-gray-600 dark:bg-gray-800",
};

export default function AdminNotificationsPage() {
  const notifications = useAdminStore((s) => s.notifications);
  const markRead = useAdminStore((s) => s.markNotificationRead);
  const markAllRead = useAdminStore((s) => s.markAllNotificationsRead);
  const unread = notifications.filter((n) => !n.is_read);

  return (
    <>
      <PageHeader
        title="Notifications"
        description={`${unread.length} unread notifications`}
        actions={
          <Button variant="outline" size="sm" onClick={() => markAllRead()}>
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
        }
      />

      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = typeIcons[notification.type];
          return (
            <button
              key={notification.id}
              type="button"
              onClick={() => markRead(notification.id)}
              className={`flex w-full gap-4 rounded-2xl border p-4 text-left transition-all ${
                notification.is_read
                  ? "border-gray-200/80 bg-white/80 dark:border-gray-800/80 dark:bg-gray-900/80"
                  : "border-blue-200 bg-blue-50/50 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/20"
              }`}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${typeColors[notification.type]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-900 dark:text-white">{notification.title}</p>
                  {!notification.is_read && <Badge variant="info">New</Badge>}
                </div>
                <p className="mt-0.5 text-sm text-gray-500">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(notification.created_at).toLocaleString("en-GH")}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
