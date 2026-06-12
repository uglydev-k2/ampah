export const siteConfig = {
  name: "Ampah Pharmacy",
  tagline: "Your Trusted Pharmacy for Quality Healthcare",
  description:
    "Premium online pharmacy offering prescription services, health products, and expert pharmaceutical care.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    phone: "+1 (555) 123-4567",
    email: "care@ampahpharmacy.com",
    address: "123 Health Avenue, Medical District, NY 10001",
  },
  hours: {
    weekdays: "Mon–Fri: 8:00 AM – 9:00 PM",
    weekend: "Sat–Sun: 9:00 AM – 6:00 PM",
  },
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
} as const;

export const productCategories = [
  { slug: "pain-relief", name: "Pain Relief", icon: "pill" },
  { slug: "vitamins-supplements", name: "Vitamins and Supplements", icon: "leaf" },
  { slug: "cold-flu", name: "Cold and Flu", icon: "thermometer" },
  { slug: "skin-care", name: "Skin Care", icon: "sparkles" },
  { slug: "baby-care", name: "Baby Care", icon: "baby" },
  { slug: "diabetes-care", name: "Diabetes Care", icon: "activity" },
  { slug: "heart-health", name: "Heart Health", icon: "heart" },
  { slug: "personal-care", name: "Personal Care", icon: "user" },
  { slug: "medical-equipment", name: "Medical Equipment", icon: "stethoscope" },
  { slug: "first-aid", name: "First Aid", icon: "cross" },
] as const;
