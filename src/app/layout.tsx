import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const siteTitle = "Copper Hearth | Copper Tumblers & Bottles India";
const siteDescription =
  "Copper Hearth makes BIS-certified pure copper tumblers and bottles for emetadata: Metadata yday wellness. Rooted in  tradition, crafted for modern India. Join the first collection.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Copper Hearth",
  url: "https://www.copperhearth.shop",
  logo: "https://www.copperhearth.shop/_next/static/media/logo-2.0gh-sf1e9qx0c.png",
  sameAs: ["https://instagram.com/copper_Hearth"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hearthcopper@gmail.com",
    contactType: "customer support",
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Copper Hearth Tumbler",
  description:
    "BIS-certified pure copper tumbler with double-wall insulation, leak-proof lid, and ergonomic handle. Available in Classic Copper, Warm Champagne, Forest Green, and Matte Black.",
  brand: {
    "@type": "Brand",
    name: "Copper Hearth",
  },
  image: "https://www.copperhearth.shop/feature.png",
  url: "https://www.copperhearth.shop",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    priceCurrency: "INR",
    seller: {
      "@type": "Organization",
      name: "Copper Hearth",
    },
  },
};

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
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "https://www.copperhearth.shop",
  },
  verification: {
  google: '26Gvc3By9bxQnj-ae8cf1ZHi3xmxqHsd9S3lN1sVknM'
},
  icons: {
    icon: [
      { url: "/logo.ico", sizes: "any" },
      { url: "/logo.ico", type: "image/x-icon" }
    ],
    apple: "/logo.ico",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Copper Hearth",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/feature.png",
        width: 1200,
        height: 630,
        alt: "Copper Hearth copper tumblers — pure copper bottles handcrafted in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* <Script
          id="product-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        /> */}
        {children}
      </body>
    </html>
  );
}
