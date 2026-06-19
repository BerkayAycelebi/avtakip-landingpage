import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Av Takip - Av ve Balıkçılık İçin Saha Takip Uygulaması",
  description:
    "Av Takip ile avlak noktalarınızı kaydedin, solunar takvimi inceleyin, hava durumunu takip edin ve ekibinizle sahada iletişimde kalın.",
  keywords:
    "av takip, solunar takvim, avlanma saatleri, telsiz uygulaması, balıkçılık takvimi, avlak haritası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${outfit.variable} antialiased`}>{children}</body>
    </html>
  );
}
