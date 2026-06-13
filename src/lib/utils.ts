import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  }).format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AP-${timestamp}-${random}`;
}

export function calculateRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

import { PRODUCTION_SITE_URL } from "@/config/site";

/** Canonical site URL for auth redirects (never localhost on production). */
export function getSiteUrl(): string {
  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    return window.location.origin;
  }

  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured && !configured.includes("localhost")) return configured;
  if (process.env.VERCEL) return PRODUCTION_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (configured) return configured;
  return "http://localhost:3000";
}

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  otp_expired: "This reset link has expired. Please request a new one below.",
  access_denied: "This reset link is invalid or has already been used. Request a new one below.",
  invalid_link: "This reset link is invalid. Please request a new one below.",
};

export function getAuthErrorMessage(code: string | null): string | null {
  if (!code) return null;
  return AUTH_ERROR_MESSAGES[code] ?? "Authentication failed. Please try again.";
}
