import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainLayout } from "@/components/layout/main-layout";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthHashErrorHandler } from "@/components/auth/auth-hash-error-handler";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["pharmacy", "healthcare", "prescription", "medicine", "online pharmacy"],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <AuthHashErrorHandler />
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
