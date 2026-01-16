"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";

export function AIdaptics() {
  return (
    <div className="h-[30rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 
        className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20" 
        style={{ fontFamily: "'MyFont', sans-serif", fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
      >
        AIdaptics
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients - Extended width */}
        <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-4/5 blur-sm" />
        <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-4/5" />
        <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-2/5 blur-sm" />
        <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-2/5" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
export default AIdaptics;
