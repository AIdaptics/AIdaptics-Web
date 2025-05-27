"use client";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/home/hero";
import WhyChooseAIdaptics from "@/components/home/whychoose";
import AIdaptics from "@/components/home/AIdaptics";
import Meeting from "@/components/home/meeting";
import FAQs from "@/components/home/Faqs";
import Reviews from "@/components/home/Reviews";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>AIdaptics</title>
        <meta name="description" content="Transform your business with AIdaptics' cutting-edge AI solutions. We turn complex ideas into effortless solutions through automation and digital transformation." />
        <meta name="keywords" content="AI solutions, automation, digital transformation, artificial intelligence, business solutions, software development, Web Development, Discord, Agency" />
        <meta name="author" content="AIdaptics" />
        <meta property="og:title" content="AIdaptics" />
        <meta property="og:description" content="We turn Complex ideas into effortless solutions." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://aidaptics.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AIdaptics" />
        <meta name="twitter:description" content="We turn Complex ideas into effortless solutions." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://aidaptics.com" />
      </Head>
      
      <div className="flex min-h-screen flex-col bg-black text-white">
        <Analytics />
        <Navbar />

        <Hero />
        <WhyChooseAIdaptics />
        <Meeting />
        <Reviews />
        <FAQs />
        <AIdaptics />

        <Footer />
      </div>
    </>
  );
}
