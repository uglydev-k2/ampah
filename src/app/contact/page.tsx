"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations/schemas";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch { /* demo */ }
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-12 dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">We&apos;re here to help with your healthcare needs</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Get in Touch</h2>
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Phone", value: siteConfig.contact.phone },
                { icon: Mail, label: "Email", value: siteConfig.contact.email },
                { icon: MapPin, label: "Address", value: siteConfig.contact.address },
                { icon: Clock, label: "Hours", value: `${siteConfig.hours.weekdays} | ${siteConfig.hours.weekend}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                    <p className="text-sm text-gray-500">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <iframe
                title="Store location"
                src="https://maps.google.com/maps?q=123+Health+Avenue+New+York+NY+10001&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Message Sent!</h3>
                <p className="mt-2 text-sm text-gray-500">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Send a Message</h2>
                <Input label="Name" {...register("name")} error={errors.name?.message} />
                <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
                <Input label="Subject" {...register("subject")} error={errors.subject?.message} />
                <Textarea label="Message" {...register("message")} error={errors.message?.message} />
                <Button type="submit" size="lg" className="w-full">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
