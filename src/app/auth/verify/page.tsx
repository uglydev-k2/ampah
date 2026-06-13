"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

function AuthVerifyHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Verifying your link…");

  useEffect(() => {
    const supabase = createClient();
    const next = searchParams.get("next") || "/auth/reset-password";
    const redirect = searchParams.get("redirect") || "/admin/login";
    const destination = `${next}?redirect=${encodeURIComponent(redirect)}`;

    const fail = (code: string) => {
      router.replace(`/admin/forgot-password?error=${encodeURIComponent(code)}`);
    };

    const hash = window.location.hash.slice(1);
    if (hash.includes("error")) {
      const hashParams = new URLSearchParams(hash);
      fail(hashParams.get("error_code") || hashParams.get("error") || "access_denied");
      return;
    }

    const code = searchParams.get("code");
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) fail(error.message.includes("expired") ? "otp_expired" : "invalid_link");
        else router.replace(destination);
      });
      return;
    }

    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    if (token_hash && type) {
      supabase.auth.verifyOtp({ token_hash, type }).then(({ error }) => {
        if (error) fail(error.message.includes("expired") ? "otp_expired" : "invalid_link");
        else router.replace(destination);
      });
      return;
    }

    setMessage("Invalid link.");
    fail("invalid_link");
  }, [router, searchParams]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

export default function AuthVerifyPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center">Loading…</div>}>
      <AuthVerifyHandler />
    </Suspense>
  );
}
