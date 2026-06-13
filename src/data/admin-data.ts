import type { OrderStatus, PaymentStatus, PrescriptionStatus } from "@/types/database";
import { sampleProducts, sampleCategories, adminStats } from "@/data/sample-data";

export interface AdminOrder {
  id: string;
  order_number: string;
  customer: string;
  email: string;
  total: number;
  items: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  created_at: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  joined: string;
  status: "active" | "inactive";
}

export interface AdminPrescription {
  id: string;
  patient_name: string;
  phone: string;
  file_name: string;
  status: PrescriptionStatus;
  created_at: string;
  notes: string | null;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "order" | "prescription" | "inventory" | "system";
  is_read: boolean;
  created_at: string;
}

export interface AdminActivity {
  id: string;
  action: string;
  detail: string;
  time: string;
  type: "order" | "prescription" | "product" | "customer" | "system";
}

export interface AdminCoupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  usage_count: number;
  usage_limit: number | null;
  is_active: boolean;
  expires_at: string | null;
}

export const adminOrders: AdminOrder[] = [
  { id: "o1", order_number: "AP-MK8X2F-A3B7", customer: "Kwame Asante", email: "kwame.a@email.com", total: 245.5, items: 4, status: "processing", payment_status: "paid", created_at: "2026-06-13T09:14:00Z" },
  { id: "o2", order_number: "AP-MK8W9C-D2E1", customer: "Ama Osei", email: "ama.osei@email.com", total: 89.0, items: 2, status: "shipped", payment_status: "paid", created_at: "2026-06-13T08:02:00Z" },
  { id: "o3", order_number: "AP-MK7R4B-C9F3", customer: "Kofi Mensah", email: "kofi.m@email.com", total: 156.75, items: 3, status: "pending", payment_status: "pending", created_at: "2026-06-12T18:45:00Z" },
  { id: "o4", order_number: "AP-MK7P1A-B8E2", customer: "Abena Darko", email: "abena.d@email.com", total: 312.0, items: 6, status: "delivered", payment_status: "paid", created_at: "2026-06-12T14:20:00Z" },
  { id: "o5", order_number: "AP-MK6N8Z-A7D1", customer: "Yaw Boateng", email: "yaw.b@email.com", total: 45.0, items: 1, status: "confirmed", payment_status: "paid", created_at: "2026-06-12T11:05:00Z" },
  { id: "o6", order_number: "AP-MK5L3Y-Z6C0", customer: "Efua Addo", email: "efua.a@email.com", total: 178.25, items: 3, status: "shipped", payment_status: "paid", created_at: "2026-06-11T16:30:00Z" },
  { id: "o7", order_number: "AP-MK4J2X-Y5B9", customer: "Nana Kofi", email: "nana.k@email.com", total: 92.5, items: 2, status: "cancelled", payment_status: "refunded", created_at: "2026-06-11T09:15:00Z" },
  { id: "o8", order_number: "AP-MK3H1W-X4A8", customer: "Akua Frimpong", email: "akua.f@email.com", total: 520.0, items: 8, status: "delivered", payment_status: "paid", created_at: "2026-06-10T20:00:00Z" },
];

export const adminCustomers: AdminCustomer[] = [
  { id: "c1", name: "Kwame Asante", email: "kwame.a@email.com", phone: "+233 24 123 4567", orders: 24, spent: 4820, joined: "2024-03-15", status: "active" },
  { id: "c2", name: "Ama Osei", email: "ama.osei@email.com", phone: "+233 20 987 6543", orders: 18, spent: 3150, joined: "2024-05-22", status: "active" },
  { id: "c3", name: "Kofi Mensah", email: "kofi.m@email.com", phone: "+233 55 456 7890", orders: 12, spent: 2100, joined: "2024-08-01", status: "active" },
  { id: "c4", name: "Abena Darko", email: "abena.d@email.com", phone: "+233 27 321 0987", orders: 31, spent: 6240, joined: "2023-11-10", status: "active" },
  { id: "c5", name: "Yaw Boateng", email: "yaw.b@email.com", phone: "+233 50 111 2233", orders: 5, spent: 680, joined: "2025-01-08", status: "active" },
  { id: "c6", name: "Efua Addo", email: "efua.a@email.com", phone: "+233 26 777 8899", orders: 9, spent: 1540, joined: "2024-09-14", status: "inactive" },
];

export const adminPrescriptions: AdminPrescription[] = [
  { id: "rx1", patient_name: "John Mensah", phone: "+233 24 555 0101", file_name: "prescription_mensah.pdf", status: "pending", created_at: "2026-06-13T10:30:00Z", notes: "Hypertension medication refill" },
  { id: "rx2", patient_name: "Grace Adom", phone: "+233 20 555 0102", file_name: "rx_adom_june.jpg", status: "pending", created_at: "2026-06-13T09:15:00Z", notes: null },
  { id: "rx3", patient_name: "Samuel Owusu", phone: "+233 55 555 0103", file_name: "owusu_rx.pdf", status: "pending", created_at: "2026-06-12T16:00:00Z", notes: "Antibiotic course — 7 days" },
  { id: "rx4", patient_name: "Patience Agyei", phone: "+233 27 555 0104", file_name: "patience_rx.jpg", status: "approved", created_at: "2026-06-12T11:20:00Z", notes: null },
  { id: "rx5", patient_name: "Daniel Tetteh", phone: "+233 50 555 0105", file_name: "tetteh_prescription.pdf", status: "rejected", created_at: "2026-06-11T14:45:00Z", notes: "Illegible handwriting" },
];

export const adminNotifications: AdminNotification[] = [
  { id: "n1", title: "New order received", message: "Order AP-MK8X2F-A3B7 from Kwame Asante — GH₵245.50", type: "order", is_read: false, created_at: "2026-06-13T09:14:00Z" },
  { id: "n2", title: "Prescription uploaded", message: "John Mensah submitted a new prescription for review", type: "prescription", is_read: false, created_at: "2026-06-13T10:30:00Z" },
  { id: "n3", title: "Low stock alert", message: "Panadol Extra is down to 12 units (threshold: 15)", type: "inventory", is_read: false, created_at: "2026-06-13T08:00:00Z" },
  { id: "n4", title: "Order shipped", message: "Order AP-MK8W9C-D2E1 has been dispatched via GExpress", type: "order", is_read: true, created_at: "2026-06-13T08:30:00Z" },
  { id: "n5", title: "System backup complete", message: "Daily database backup completed successfully", type: "system", is_read: true, created_at: "2026-06-13T02:00:00Z" },
];

export const adminActivities: AdminActivity[] = [
  { id: "a1", action: "New order", detail: "AP-MK8X2F-A3B7 — GH₵245.50", time: "2 min ago", type: "order" },
  { id: "a2", action: "Prescription submitted", detail: "John Mensah — hypertension refill", time: "45 min ago", type: "prescription" },
  { id: "a3", action: "Product updated", detail: "Voltaren Emulgel stock adjusted to 85", time: "1 hr ago", type: "product" },
  { id: "a4", action: "Customer registered", detail: "Yaw Boateng joined Ampah Pharmacy", time: "3 hr ago", type: "customer" },
  { id: "a5", action: "Order delivered", detail: "AP-MK3H1W-X4A8 — Akua Frimpong", time: "5 hr ago", type: "order" },
  { id: "a6", action: "Low stock warning", detail: "Ibuprofen 400mg — 14 units remaining", time: "6 hr ago", type: "product" },
];

export const adminCoupons: AdminCoupon[] = [
  { id: "cp1", code: "WELCOME10", discount_type: "percentage", discount_value: 10, usage_count: 342, usage_limit: 1000, is_active: true, expires_at: "2026-12-31" },
  { id: "cp2", code: "HEALTH5", discount_type: "fixed", discount_value: 5, usage_count: 128, usage_limit: 500, is_active: true, expires_at: "2026-09-30" },
  { id: "cp3", code: "FREESHIP", discount_type: "fixed", discount_value: 25, usage_count: 89, usage_limit: null, is_active: true, expires_at: null },
  { id: "cp4", code: "SUMMER20", discount_type: "percentage", discount_value: 20, usage_count: 56, usage_limit: 200, is_active: false, expires_at: "2025-08-31" },
];

export const ordersChart = [
  { month: "Jan", orders: 142, revenue: 85000 },
  { month: "Feb", orders: 158, revenue: 92000 },
  { month: "Mar", orders: 171, revenue: 101000 },
  { month: "Apr", orders: 165, revenue: 98000 },
  { month: "May", orders: 189, revenue: 112000 },
  { month: "Jun", orders: 203, revenue: 124000 },
  { month: "Jul", orders: 198, revenue: 118000 },
  { month: "Aug", orders: 215, revenue: 131000 },
  { month: "Sep", orders: 228, revenue: 142000 },
  { month: "Oct", orders: 221, revenue: 138000 },
  { month: "Nov", orders: 247, revenue: 156000 },
  { month: "Dec", orders: 262, revenue: 167500 },
];

export const categoryBreakdown = sampleCategories.map((cat) => {
  const count = sampleProducts.filter((p) => p.category_id === cat.id).length;
  const revenue = sampleProducts
    .filter((p) => p.category_id === cat.id)
    .reduce((sum, p) => sum + p.price * Math.min(p.stock, 50), 0);
  return { name: cat.name, products: count, revenue, color: getCategoryColor(cat.slug) };
}).filter((c) => c.products > 0);

function getCategoryColor(slug: string): string {
  const colors: Record<string, string> = {
    "pain-relief": "#2563eb",
    "vitamins-supplements": "#059669",
    "cold-flu": "#0891b2",
    "skin-care": "#d946ef",
    "baby-care": "#f59e0b",
    "diabetes-care": "#ef4444",
    "heart-health": "#ec4899",
    "personal-care": "#8b5cf6",
    "medical-equipment": "#64748b",
    "first-aid": "#14b8a6",
  };
  return colors[slug] ?? "#6366f1";
}

export const topProducts = [...sampleProducts]
  .sort((a, b) => b.review_count * b.rating - a.review_count * a.rating)
  .slice(0, 8)
  .map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image_url,
    sales: Math.floor(p.review_count * 1.4),
    revenue: Math.floor(p.review_count * 1.4 * p.price),
    stock: p.stock,
  }));

export const lowStockProducts = sampleProducts
  .filter((p) => p.stock <= p.low_stock_threshold)
  .sort((a, b) => a.stock - b.stock)
  .slice(0, 10);

export const dashboardKpis = {
  revenue: { value: adminStats.totalRevenue, change: 12.5, trend: [85000, 92000, 101000, 98000, 112000, 124000] },
  orders: { value: adminStats.totalOrders, change: 8.2, trend: [142, 158, 171, 165, 189, 203] },
  customers: { value: adminStats.totalCustomers, change: 15.1, trend: [2800, 2950, 3100, 3200, 3310, 3421] },
  products: { value: adminStats.totalProducts, change: 3, trend: [198, 200, 202, 204, 205, adminStats.totalProducts] },
  avgOrder: { value: Math.round(adminStats.totalRevenue / adminStats.totalOrders), change: 4.8, trend: [95, 98, 102, 99, 105, 100] },
  conversion: { value: 3.8, change: 0.6, trend: [3.1, 3.2, 3.4, 3.5, 3.6, 3.8] },
};

export { adminStats };
