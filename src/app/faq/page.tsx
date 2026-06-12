import type { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";
import { faqItems } from "@/data/sample-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about our pharmacy services, delivery, prescriptions, and more.",
};

export default function FAQPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-12 dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Find answers to common questions about our services</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Accordion items={faqItems} />
      </div>
    </>
  );
}
