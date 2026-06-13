import { create } from "zustand";
import {
  adminOrders as initialOrders,
  adminPrescriptions as initialPrescriptions,
  adminNotifications as initialNotifications,
  type AdminOrder,
  type AdminPrescription,
  type AdminNotification,
} from "@/data/admin-data";
import { lowStockProducts } from "@/data/admin-data";
import type { OrderStatus, PrescriptionStatus } from "@/types/database";

export interface AdminToast {
  id: string;
  title: string;
  message?: string;
  type: "success" | "error" | "info";
}

interface AdminStore {
  orders: AdminOrder[];
  prescriptions: AdminPrescription[];
  notifications: AdminNotification[];
  commandOpen: boolean;
  sidebarCollapsed: boolean;
  toasts: AdminToast[];
  setCommandOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  approvePrescription: (id: string) => void;
  rejectPrescription: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addToast: (toast: Omit<AdminToast, "id">) => void;
  removeToast: (id: string) => void;
  badgeCounts: () => {
    pendingOrders: number;
    lowStock: number;
    pendingRx: number;
    unreadNotifications: number;
  };
}

let toastCounter = 0;

export const useAdminStore = create<AdminStore>((set, get) => ({
  orders: initialOrders,
  prescriptions: initialPrescriptions,
  notifications: initialNotifications,
  commandOpen: false,
  sidebarCollapsed: false,
  toasts: [],

  setCommandOpen: (open) => set({ commandOpen: open }),

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  updateOrderStatus: (id, status) => {
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
    get().addToast({ title: "Order updated", message: `Status changed to ${status}`, type: "success" });
  },

  approvePrescription: (id) => {
    set((s) => ({
      prescriptions: s.prescriptions.map((r) =>
        r.id === id ? { ...r, status: "approved" as PrescriptionStatus } : r
      ),
    }));
    get().addToast({ title: "Prescription approved", type: "success" });
  },

  rejectPrescription: (id) => {
    set((s) => ({
      prescriptions: s.prescriptions.map((r) =>
        r.id === id ? { ...r, status: "rejected" as PrescriptionStatus } : r
      ),
    }));
    get().addToast({ title: "Prescription rejected", type: "info" });
  },

  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    })),

  markAllNotificationsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, is_read: true })),
    })),

  addToast: (toast) => {
    const id = `toast-${++toastCounter}`;
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    setTimeout(() => get().removeToast(id), 4000);
  },

  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  badgeCounts: () => {
    const s = get();
    return {
      pendingOrders: s.orders.filter((o) => ["pending", "confirmed", "processing"].includes(o.status)).length,
      lowStock: lowStockProducts.length,
      pendingRx: s.prescriptions.filter((r) => r.status === "pending").length,
      unreadNotifications: s.notifications.filter((n) => !n.is_read).length,
    };
  },
}));
