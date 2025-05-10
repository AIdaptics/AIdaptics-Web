"use client";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/home/hero";
import WhyChooseAIdaptics from "@/components/home/whychoose";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <Hero />
      <WhyChooseAIdaptics />

      <Footer />
    </div>
  );
}
