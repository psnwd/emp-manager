import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@emp/ui";
import { ThemeProvider } from "@emp/ui/theme";

import "@/app/globals.css";

import Link from "next/link";
import { env } from "@/env";
import StoreProvider from "@/provider/store-provider";

import { Menubar, MenubarMenu } from "@emp/ui/menubar";
import { ThemeToggle } from "@emp/ui/theme";
import { Toaster } from "@emp/ui/toast";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://some_emp.com"
      : "http://localhost:3000",
  ),
  title: "Employee Management Portal",
  description: "Manage your employees with ease using our portal",
  openGraph: {
    title: "Employee Management Portal",
    description: "Manage your employees with ease using our portal",
    url: "https://some_emp.com",
    siteName: "Employee Management Portal",
  },
  twitter: {
    card: "summary_large_image",
    site: "",
    creator: "",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreProvider>
            <Menubar className="h-14">
              <MenubarMenu>
                <div className="flex w-full items-center justify-between px-3">
                  <Link href="/">
                    <div className="select-none text-xl font-semibold">
                      Employee Manager
                    </div>
                  </Link>
                  <ThemeToggle />
                </div>
              </MenubarMenu>
            </Menubar>
            {props.children}
            <Toaster />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
