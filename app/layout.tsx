import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aidaptics.com"),
  title: "AIdaptics - We turn Complex ideas into effortless solutions",
  description: "AIdaptics transforms complex business challenges into streamlined AI-powered solutions. Expert development, automation, and digital transformation services.",
  keywords: ["AI solutions", "automation", "digital transformation", "software development", "artificial intelligence", "business solutions"],
  authors: [{ name: "AIdaptics Team" }],
  creator: "AIdaptics",
  publisher: "AIdaptics",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aidaptics.com",
    siteName: "AIdaptics",
    title: "AIdaptics - We turn Complex ideas into effortless solutions",
    description: "AIdaptics transforms complex business challenges into streamlined AI-powered solutions. Expert development, automation, and digital transformation services.",
    images: [
      {
        url: "/AIdaptics.png",
        width: 1200,
        height: 630,
        alt: "AIdaptics - Complex ideas into effortless solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIdaptics - We turn Complex ideas into effortless solutions",
    description: "AIdaptics transforms complex business challenges into streamlined AI-powered solutions. Expert development, automation, and digital transformation services.",
    images: ["/AIdaptics.png"],
    creator: "@aidaptics",
  },
  alternates: {
    canonical: "https://aidaptics.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
