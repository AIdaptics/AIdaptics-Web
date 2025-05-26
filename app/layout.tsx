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
  title: "AIdaptics",
  description: "We turn Complex ideas into effortless solutions.",
  openGraph: {
    title: "AIdaptics",
    description: "We turn Complex ideas into effortless solutions.",
    images: [
      {
        url: "/AIdaptics.png", 
        width: 1200,
        height: 630,
        alt: "AIdaptics - We Turn Complex ideas into effortless solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIdaptics",
    description: "We turn Complex ideas into effortless solutions.",
    images: ["/AIdaptics.png"], 
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
        {children}
      </body>
    </html>
  );
}
