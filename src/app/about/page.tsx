import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Award, Users, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — our mission, licensed pharmacists, and commitment to quality healthcare.`,
};

const certifications = [
  "State Board of Pharmacy Licensed",
  "NABP Verified Internet Pharmacy",
  "HIPAA Compliant",
  "FDA Registered Facility",
  "BBB Accredited Business",
  "PCAB Accredited Compounding",
];

const pharmacists = [
  { name: "Dr. Sarah Mitchell, PharmD", role: "Chief Pharmacist", experience: "15+ years", image: "SM" },
  { name: "Dr. James Park, PharmD", role: "Clinical Pharmacist", experience: "12+ years", image: "JP" },
  { name: "Dr. Lisa Thompson, PharmD", role: "Consultation Specialist", experience: "10+ years", image: "LT" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-16 dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About {siteConfig.name}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Dedicated to providing accessible, affordable, and quality healthcare to our community since 2010.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
              <p className="mb-4 text-gray-600 leading-relaxed dark:text-gray-400">
                Founded in 2010, {siteConfig.name} began with a simple mission: make quality healthcare accessible to everyone.
                What started as a small neighborhood pharmacy has grown into a trusted online healthcare destination serving over 50,000 customers nationwide.
              </p>
              <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                Our team of licensed pharmacists and healthcare professionals work tirelessly to ensure every product meets the highest standards of safety and efficacy.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image src="https://images.unsplash.com/photo-1587854692152-cad860a0e7a?w=800&h=600&fit=crop" alt="Our pharmacy" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Heart className="mb-4 h-10 w-10 text-blue-600" />
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To improve the health and well-being of our community by providing exceptional pharmaceutical care, quality products, and personalized service at affordable prices.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Shield className="mb-4 h-10 w-10 text-emerald-600" />
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To be the most trusted online pharmacy, setting the standard for quality, safety, and customer care in digital healthcare delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 dark:text-white">Licensed Pharmacists</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pharmacists.map((p) => (
              <div key={p.name} className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600 dark:bg-blue-900">
                  {p.image}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                <p className="text-sm text-blue-600">{p.role}</p>
                <p className="mt-1 text-xs text-gray-500">{p.experience} experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 dark:text-white">Certifications & Accreditations</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <Award className="h-5 w-5 shrink-0 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Users className="mx-auto mb-4 h-12 w-12 text-blue-600" />
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Customer Trust</h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            With a 4.9-star average rating and over 50,000 satisfied customers, we&apos;ve built our reputation on trust, transparency, and exceptional care.
            Every product is verified, every prescription is reviewed by a licensed pharmacist, and every customer is treated like family.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "4.9★", label: "Average Rating" },
              { value: "15+", label: "Years of Service" },
              { value: "99.8%", label: "Order Accuracy" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
