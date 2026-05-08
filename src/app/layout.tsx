import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gadgets By Kihoro - Your Trusted Gadgets Store",
  description: "Discover the latest tech at unbeatable prices. Fast delivery, authentic products, and exceptional service at Gadgets By Kihoro.",
  keywords: ["gadgets", "electronics", "smartphones", "Kenya", "tablets", "accessories", "Gadgets By Kihoro"],
  authors: [{ name: "Gadgets By Kihoro" }],
  openGraph: {
    title: "Gadgets By Kihoro - Your Trusted Gadgets Store",
    description: "Discover the latest tech at unbeatable prices. Authentic products and exceptional service in Kenya.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gadgets By Kihoro",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
