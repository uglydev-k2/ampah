"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Catches Supabase auth errors in URL hash (e.g. #error_code=otp_expired) and redirects. */
export function AuthHashErrorHandler() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("error")) return;

    const params = new URLSearchParams(hash.slice(1));
    const errorCode = params.get("error_code") || params.get("error") || "auth";
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    router.replace(`/admin/forgot-password?error=${encodeURIComponent(errorCode)}`);
  }, [router]);

  return null;
}
