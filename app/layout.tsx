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
  metadataBase: new URL("https://www.charliecafe.com"),
  title: "LoDeCharlie MAD — Café en Madrid, Próximamente 2026",
  description:
    "LoDeCharlie es un café de barrio con alma que abre en Madrid en 2026. Apúntate para ser de los primeros en enterarte.",
  keywords: ["café Madrid", "coffee shop Madrid", "LoDeCharlie", "cafetería Madrid 2026"],
  authors: [{ name: "LoDeCharlie MAD" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.charliecafe.com",
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
  url: "https://www.charliecafe.com",
  logo: "https://www.charliecafe.com/logo.png",
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
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P5F2M7XH');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5F2M7XH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  );
}
