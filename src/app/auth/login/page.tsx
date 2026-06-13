"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/lib/validations/schemas";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/config/site";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const loginForm = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onLogin = async (data: LoginInput) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (authError) setError(authError.message);
    else router.push("/dashboard");
    setLoading(false);
  };

  const onRegister = async (data: RegisterInput) => {
    setLoading(true);
    setError("");
    setSuccess("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as { error?: string; message?: string; success?: boolean };

    if (response.status === 503) {
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { full_name: data.fullName, phone: data.phone ?? null } },
      });

      if (authError) {
        setError(
          authError.message.includes("Database error")
            ? "Account setup failed. Run supabase/migrations/002_fix_signup_trigger.sql in your Supabase SQL Editor, then try again."
            : authError.message
        );
      } else {
        setSuccess("Account created! Check your email to confirm, then sign in.");
        setIsRegister(false);
        loginForm.setValue("email", data.email);
      }
      setLoading(false);
      return;
    }

    if (!response.ok) {
      setError(result.error ?? "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(result.message ?? "Account created! You can sign in now.");
    setIsRegister(false);
    loginForm.setValue("email", data.email);
    setLoading(false);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="mb-6 text-sm text-gray-500">Sign in to {siteConfig.name}</p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950">{error}</div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950">{success}</div>
        )}

        {isRegister ? (
          <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
            <Input label="Full Name" {...registerForm.register("fullName")} error={registerForm.formState.errors.fullName?.message} />
            <Input label="Email" type="email" {...registerForm.register("email")} error={registerForm.formState.errors.email?.message} />
            <Input label="Phone" {...registerForm.register("phone")} error={registerForm.formState.errors.phone?.message} />
            <Input label="Password" type="password" {...registerForm.register("password")} error={registerForm.formState.errors.password?.message} />
            <Input label="Confirm Password" type="password" {...registerForm.register("confirmPassword")} error={registerForm.formState.errors.confirmPassword?.message} />
            <Button type="submit" className="w-full" isLoading={loading}>Create Account</Button>
          </form>
        ) : (
          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
            <Input label="Email" type="email" {...loginForm.register("email")} error={loginForm.formState.errors.email?.message} />
            <Input label="Password" type="password" {...loginForm.register("password")} error={loginForm.formState.errors.password?.message} />
            <Button type="submit" className="w-full" isLoading={loading}>Sign In</Button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-gray-500">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setSuccess("");
            }}
            className="font-medium text-blue-600 hover:underline"
          >
            {isRegister ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
}
