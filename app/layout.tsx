import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeScript } from "@/components/theme/ThemeScript";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Harsh Prajapati — Software Engineer & Java Developer";
const DESCRIPTION =
  "Portfolio of Harsh Prajapati, a Software Engineer specializing in Java, Spring Boot, Hibernate, Microservices, SQL, and REST APIs.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL once this is deployed so canonical/OG URLs
  // resolve to the real domain instead of localhost — left unset rather
  // than guessing a domain that doesn't exist yet.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    // Relative — resolves against metadataBase above, so it's correct in
    // both dev (localhost) and production (NEXT_PUBLIC_SITE_URL) without
    // this file knowing which one it is.
    canonical: "/",
  },
  keywords: [
    "Harsh Prajapati",
    "Software Engineer",
    "Java Developer",
    "Backend Developer",
    "Spring Boot",
    "Microservices",
    "Full Stack Developer",
  ],
  authors: [{ name: "HarshPrajapati" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "HarshPrajapati — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        {/* Off-screen until focused — lets a keyboard user jump straight
            past the fixed header/side-nav chrome instead of tabbing
            through every dot to reach the page content. */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
