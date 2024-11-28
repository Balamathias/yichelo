import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { BRAND_NAME, cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { fileRouter } from "./api/uploadthing/core";
import { connection } from "next/server"; 
import { Suspense } from "react"; 
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

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

async function UTSSR() {
  await connection(); 
  return <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
}

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
        <QueryProvider>
          <Suspense>
            <ThemeProvider>
                {children}
            </ThemeProvider>
            <UTSSR />
            <Toaster />
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
