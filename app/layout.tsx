import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const BASE_URL = "https://sytch.com.ua";

export const metadata: Metadata = {
  title: "Sytch Coffee Roasters — свіжообсмажена specialty кава у Києві",
  description: "Sytch Coffee Roasters. Ми обсмажуємо та доставляємо свіжообсмажену specialty каву для дому, офісів та кав'ярень. Еспресо і фільтр, роздріб та опт від 2 кг. Київ.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Sytch Coffee Roasters — свіжообсмажена specialty кава",
    description: "Ми обсмажуємо та доставляємо свіжообсмажену specialty каву для дому, офісів та кав'ярень. Еспресо і фільтр, роздріб та опт від 2 кг. Київ.",
    url: BASE_URL,
    siteName: "Sytch Coffee Roasters",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sytch Coffee Roasters — свіжообсмажена specialty кава",
    description: "Ми обсмажуємо та доставляємо свіжообсмажену specialty каву для дому, офісів та кав'ярень. Київ.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sytch Coffee Roasters",
  "description": "Ми обсмажуємо та доставляємо свіжообсмажену specialty каву для дому, офісів та кав'ярень.",
  "url": BASE_URL,
  "telephone": "+380675067392",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Київ",
    "addressCountry": "UA",
  },
  "sameAs": ["https://t.me/denissytchev"],
  "priceRange": "₴₴",
  "servesCuisine": "Coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#FF5C39" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5RFMDK24MX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5RFMDK24MX');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
