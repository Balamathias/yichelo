import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import "./globals.css";
import { BRAND_NAME, cn } from "@/lib/utils";

const inter = Inter({
  variable: "--flow-circular",
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Home`,
  description: `${BRAND_NAME}, your ultimate electronic store for all your needs.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`antialiased`, inter.className)}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
