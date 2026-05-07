import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { PHProvider } from "./providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://charliecafe.com"),
  title: "LoDeCharlie MAD — Café en Madrid, Próximamente 2026",
  description:
    "LoDeCharlie es un café de barrio con alma que abre en Madrid en 2026. Apúntate para ser de los primeros en enterarte.",
  keywords: ["café Madrid", "coffee shop Madrid", "LoDeCharlie", "cafetería Madrid 2026"],
  authors: [{ name: "LoDeCharlie MAD" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://charliecafe.com",
    siteName: "LoDeCharlie MAD",
    title: "LoDeCharlie MAD — Café en Madrid, Próximamente 2026",
    description:
      "Un café de barrio con alma. Muy pronto en Madrid, 2026. Apúntate para ser de los primeros en enterarte.",
    images: [
      {
        url: "/logo.png",
        width: 600,
        height: 200,
        alt: "LoDeCharlie MAD logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LoDeCharlie MAD — Café en Madrid, Próximamente 2026",
    description: "Un café de barrio con alma. Muy pronto en Madrid, 2026.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "LoDeCharlie MAD",
  description: "Un café de barrio con alma. Muy pronto en Madrid, 2026.",
  url: "https://charliecafe.com",
  logo: "https://charliecafe.com/logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressCountry: "ES",
  },
  openingDate: "2026",
  servesCuisine: "Coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise min-h-full flex flex-col">
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  );
}
