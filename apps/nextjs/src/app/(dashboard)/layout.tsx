import type { Metadata, Viewport } from "next";
import { env } from "@/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://some_emp.com"
      : "http://localhost:3000",
  ),
  title: "Dashboard | Employee Management Portal",
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
  return <>{props.children}</>;
}
