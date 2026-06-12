import Link from "next/link";
import { Pill, Phone, Mail, MapPin, Share2, Globe, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Pain Relief", href: "/shop?category=pain-relief" },
    { label: "Vitamins", href: "/shop?category=vitamins-supplements" },
    { label: "First Aid", href: "/shop?category=first-aid" },
  ],
  services: [
    { label: "Upload Prescription", href: "/prescription" },
    { label: "Pharmacist Consult", href: "/contact" },
    { label: "Insurance Info", href: "/faq" },
    { label: "Delivery Options", href: "/faq" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                <Pill className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{siteConfig.name}</span>
            </Link>
            <p className="mb-4 max-w-sm text-sm text-gray-500">{siteConfig.description}</p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-600" />{siteConfig.contact.phone}</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-600" />{siteConfig.contact.email}</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-600" />{siteConfig.contact.address}</p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                {key}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Hours</h4>
            <div className="space-y-1 text-sm text-gray-500">
              <p>{siteConfig.hours.weekdays}</p>
              <p>{siteConfig.hours.weekend}</p>
            </div>
            <div className="mt-4 flex gap-3">
              {[Share2, Globe, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm transition-colors hover:bg-blue-600 hover:text-white dark:bg-gray-800">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-800">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Licensed Pharmacy.</p>
        </div>
      </div>
    </footer>
  );
}
