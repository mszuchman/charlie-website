import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
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
  metadataBase: new URL("https://lodecharlie.com"),
  title: "LoDeCharlie MAD — Coming Soon",
  description: "Un café de barrio con alma. Próximamente en Madrid, 2026.",
  openGraph: {
    title: "LoDeCharlie MAD — Coming Soon",
    description: "Un café de barrio con alma. Próximamente en Madrid, 2026.",
    images: ["/logo.png"],
  },
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
      <body className="noise min-h-full flex flex-col">{children}</body>
    </html>
  );
}
