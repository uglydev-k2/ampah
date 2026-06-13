"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Pill, Shield, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginInput } from "@/lib/validations/schemas";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/config/site";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError("");

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      setError("Sign-in failed. Please try again.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      setError("Could not verify your account permissions.");
      setLoading(false);
      return;
    }

    if (profile.role !== "admin" && profile.role !== "pharmacist") {
      await supabase.auth.signOut();
      setError("Access denied. This login is for pharmacy staff only.");
      setLoading(false);
      return;
    }

    router.push(redirect.startsWith("/admin") ? redirect : "/admin");
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="dark">
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-mesh-shift" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl animate-mesh-shift" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-600/40">
            <Pill className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">{siteConfig.name}</h1>
          <p className="mt-1 text-sm font-medium uppercase tracking-widest text-slate-500">Command Center</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Staff Sign In</h2>
              <p className="text-sm text-slate-400">Admin & pharmacist access only</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-300">
              {error}
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
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              {...form.register("password")}
              error={form.formState.errors.password?.message}
            />
            <Button type="submit" className="w-full shadow-lg shadow-blue-600/30" isLoading={loading}>
              <Lock className="h-4 w-4" />
              Sign In to Dashboard
            </Button>
          </form>

          <div className="mt-6 space-y-3 border-t border-slate-800 pt-6">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to storefront
            </Link>
            <p className="text-center text-xs text-slate-500">
              Customer?{" "}
              <Link href="/auth/login" className="text-blue-400 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
