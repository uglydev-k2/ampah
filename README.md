# Ampah Pharmacy

A modern, professional, mobile-responsive pharmacy e-commerce website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS v4
- **Backend:** Supabase (Auth, PostgreSQL, Storage)
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **UI:** Lucide React, Framer Motion, Recharts
- **Animations:** Framer Motion

## Getting Started

```bash
cd ampah-pharmacy
npm install
cp .env.example .env.local
# Add your Supabase credentials to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL Editor
3. Run `supabase/seed.sql` for sample data
4. Create a Storage bucket named `prescriptions`
5. Copy project URL and anon key to `.env.local`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   ├── auth/               # Authentication
│   ├── shop/               # Product catalog
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── dashboard/          # Customer dashboard
│   └── ...                 # Public pages
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Header, Footer, Layout
│   ├── shop/               # Shop-specific components
│   └── providers/          # Context providers
├── config/                 # Site configuration
├── data/                   # Sample/mock data
├── lib/
│   ├── supabase/           # Supabase clients
│   └── validations/        # Zod schemas
├── stores/                 # Zustand stores
└── types/                  # TypeScript interfaces
supabase/
├── migrations/             # Database schema
└── seed.sql                # Sample data
```

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| Shop | `/shop` |
| Product Details | `/shop/[slug]` |
| Prescription Upload | `/prescription` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| About | `/about` |
| Contact | `/contact` |
| FAQ | `/faq` |
| Customer Dashboard | `/dashboard` |
| Admin Dashboard | `/admin` |
| Login | `/auth/login` |

## Features

- Responsive design with dark mode
- Product search, filtering, sorting, pagination
- Shopping cart & wishlist (Zustand + localStorage)
- Prescription upload (Supabase Storage)
- Role-based auth (customer, admin, pharmacist)
- Admin analytics dashboard with revenue charts
- Coupon code validation
- Rate-limited API routes
- SEO metadata & accessibility

## Database Tables

Users (profiles), Products, Categories, Orders, OrderItems, CartItems, Reviews, Prescriptions, Addresses, Coupons, Notifications

## License

Private — All rights reserved.
