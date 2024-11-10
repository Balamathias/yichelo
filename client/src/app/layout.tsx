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
        <Suspense>
          <ThemeProvider>
              {children}
          </ThemeProvider>
          <UTSSR />
        </Suspense>
      </body>
    </html>
  );
}
