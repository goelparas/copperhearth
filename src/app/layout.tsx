import type { Metadata } from "next";
import { Inter, EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-fallback",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Copper Hearth | Premium  Copper Wellness",
  description: "Experience the elegance of handcrafted copper wellness products. Authentic, sustainable, and designed for modern living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${ebGaramond.variable}`}>
      <body className="antialiased bg-brand-copper-soft">
        {children}
      </body>
    </html>
  );
}
