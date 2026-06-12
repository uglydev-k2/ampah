"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-emerald-50 p-8 text-center dark:bg-emerald-950">
        <p className="font-semibold text-emerald-700 dark:text-emerald-300">Thank you for subscribing!</p>
        <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">You&apos;ll receive health tips and exclusive offers.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 p-8 text-white sm:p-10">
      <div className="mx-auto max-w-xl text-center">
        <Mail className="mx-auto mb-4 h-10 w-10" />
        <h3 className="mb-2 text-2xl font-bold">Stay Healthy, Stay Informed</h3>
        <p className="mb-6 text-blue-100">Subscribe for health tips, exclusive deals, and pharmacy updates.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 border-0 bg-white/90 text-gray-900 placeholder:text-gray-400"
            aria-label="Email for newsletter"
          />
          <Button type="submit" variant="secondary" className="shrink-0 bg-white text-blue-600 hover:bg-gray-100">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}
