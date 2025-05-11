"use client";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/home/hero";
import WhyChooseAIdaptics from "@/components/home/whychoose";
import AIdaptics from "@/components/home/AIdaptics";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Analytics />
      <Navbar />

      <Hero />
      <WhyChooseAIdaptics />
      <AIdaptics />

      <Footer />
    </div>
  );
}
