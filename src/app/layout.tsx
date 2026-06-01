import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.copperhearth.shop"),
  title: "Copper Hearth | Premium Copper Wellness",
  description: "The water you drink matters more than the supplements you take. Experience the elegance of handcrafted copper wellness products designed for modern living.",
  icons: {
    icon: [
      { url: "/logo.ico", sizes: "any" },
      { url: "/logo.ico", type: "image/x-icon" }
    ],
    apple: "/logo.ico",
  },
  openGraph: {
    title: "Copper Hearth | Premium Copper Wellness",
    description: "The water you drink matters more than the supplements you take. Experience the elegance of handcrafted copper wellness products designed for modern living.",
    siteName: "Copper Hearth",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/feature.png",
        width: 1200,
        height: 630,
        alt: "Copper Hearth | Premium Copper Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Copper Hearth | Premium Copper Wellness",
    description: "The water you drink matters more than the supplements you take. Experience the elegance of handcrafted copper wellness products designed for modern living.",
    images: ["/feature.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${ebGaramond.variable}`}>
      <body className="antialiased bg-brand-copper-soft">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7B2H05BPTZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7B2H05BPTZ');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
