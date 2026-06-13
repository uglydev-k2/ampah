import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Warehouse,
  ShoppingCart,
  Users,
  FileText,
  Bell,
  Tag,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/prescriptions", label: "Prescriptions", icon: FileText },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
];

export function getPageTitle(pathname: string): string {
  const item = adminNavItems.find(
    (n) => n.href === pathname || (n.href !== "/admin" && pathname.startsWith(n.href))
  );
  return item?.label ?? "Admin";
}
