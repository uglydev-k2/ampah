"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Pill, Shield, ArrowLeft, Mail } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { getAuthErrorMessage, getSiteUrl } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotInput = z.infer<typeof schema>;

function AdminForgotPasswordForm() {
  const searchParams = useSearchParams();
  const linkError = getAuthErrorMessage(searchParams.get("error"));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ForgotInput>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ForgotInput) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, redirect: "/admin/login" }),
      });

      const result = (await res.json()) as { error?: string; success?: boolean };

      if (!res.ok) {
        setError(result.error ?? "Could not send reset link. Try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    }

    setLoading(false);
  };

  return (
    <div className="dark">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-mesh-shift" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-600/40">
              <Pill className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">{siteConfig.name}</h1>
            <p className="mt-1 text-sm font-medium uppercase tracking-widest text-slate-500">Reset Password</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Forgot your password?</h2>
                <p className="text-sm text-slate-400">We&apos;ll email you a reset link</p>
              </div>
            </div>

            {linkError && (
              <div className="mb-4 rounded-xl border border-amber-900/50 bg-amber-950/50 p-3 text-sm text-amber-200">
                {linkError}
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-xl border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-300">{error}</div>
            )}
            {success && (
              <div className="mb-4 rounded-xl border border-emerald-900/50 bg-emerald-950/50 p-3 text-sm text-emerald-300">
                Reset link sent! Open the email on your phone and tap the link within 1 hour. It will go to{" "}
                <strong>{getSiteUrl()}</strong>.
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Work Email"
                type="email"
                autoComplete="email"
                {...form.register("email")}
                error={form.formState.errors.email?.message}
              />
              <Button type="submit" className="w-full" isLoading={loading}>
                <Mail className="h-4 w-4" />
                Send Reset Link
              </Button>
            </form>

            <Link
              href="/admin/login"
              className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to admin login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">Loading…</div>}>
      <AdminForgotPasswordForm />
    </Suspense>
  );
}
