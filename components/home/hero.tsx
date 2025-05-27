"use client";
import { useEffect, useState, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { Application } from "@splinetool/runtime";
import Image from "next/image";
import HeroGif from "@/public/quantum (1).gif";
import Link from "next/link";

const Hero: React.FC = () => {
  const [canHandle3D, setCanHandle3D] = useState<boolean>(true);
  const [isSplineLoaded, setIsSplineLoaded] = useState<boolean>(false);

  const performanceCheckRef = useRef<boolean>(false);

  useEffect(() => {
    const checkDeviceCapabilities = async () => {
      // Basic checks
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (isMobileDevice) {
        setCanHandle3D(false);
        return;
      }
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

      if (!gl) {
        setCanHandle3D(false);
        return;
      }

      // Get GPU renderer info if available
      let renderer = "";
      try {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          renderer = gl
            .getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            .toLowerCase();
        }
      } catch {
        console.log("GPU info not available");
      }

      // Check for known low-performance indicators
      const isLowEndGPU =
        renderer.includes("intel") ||
        renderer.includes("mesa") ||
        renderer.includes("swiftshader");

      // Device memory check (if available)
      const deviceMemory =
        typeof (navigator as Navigator & { deviceMemory?: number })
          .deviceMemory === "number"
          ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory!
          : 4;

      // CPU cores check
      const cpuCores = navigator.hardwareConcurrency || 4;

      // Screen resolution check
      const pixelRatio = window.devicePixelRatio || 1;
      const screenResolution =
        window.screen.width * window.screen.height * pixelRatio;

      // Performance check using requestAnimationFrame
      if (!performanceCheckRef.current) {
        performanceCheckRef.current = true;

        let frameCount = 0;
        const lastTime = performance.now();
        const measurePerformance = (timestamp: number) => {
          frameCount++;

          if (timestamp - lastTime >= 1000) {
            // Check after 1 second
            const fps = frameCount;
            const score = calculatePerformanceScore(
              fps,
              deviceMemory,
              cpuCores,
              screenResolution,
              isLowEndGPU,
              isMobileDevice
            );

            setCanHandle3D(score >= 30); // Threshold can be adjusted
            return;
          }

          requestAnimationFrame(measurePerformance);
        };

        requestAnimationFrame(measurePerformance);
      }
    };

    const calculatePerformanceScore = (
      fps: number,
      memory: number,
      cores: number,
      resolution: number,
      isLowEndGPU: boolean,
      isMobile: boolean
    ): number => {
      // Base score from FPS (max 40 points)
      let score = Math.min(40, (fps / 60) * 40);

      // Memory score (max 20 points)
      score += Math.min(20, (memory / 8) * 20);

      // CPU score (max 20 points)
      score += Math.min(20, (cores / 8) * 20);

      // Resolution penalty for very high-res screens
      const resolutionPenalty =
        resolution > 1920 * 1080
          ? Math.min(10, ((resolution - 1920 * 1080) / (3840 * 2160)) * 10)
          : 0;
      score -= resolutionPenalty;

      // GPU penalty
      if (isLowEndGPU) score *= 0.8;

      // Mobile penalty
      if (isMobile) score *= 0.9;

      return Math.round(score);
    };

    // Run the check
    checkDeviceCapabilities();

    // Cleanup
    return () => {
      performanceCheckRef.current = false;
    };
  }, []);

  // Performance monitoring during 3D scene usage
  useEffect(() => {
    if (!canHandle3D || !isSplineLoaded) return;

    let frameCount = 0;
    let lastCheck = performance.now();
    let lowPerformanceStrikes = 0;
    const MAX_STRIKES = 3;

    const monitorPerformance = (timestamp: number) => {
      frameCount++;

      if (timestamp - lastCheck >= 1000) {
        const currentFPS = frameCount;

        if (currentFPS < 30) {
          lowPerformanceStrikes++;

          if (lowPerformanceStrikes >= MAX_STRIKES) {
            setCanHandle3D(false);
            return;
          }
        } else {
          lowPerformanceStrikes = Math.max(0, lowPerformanceStrikes - 1);
        }

        frameCount = 0;
        lastCheck = timestamp;
      }

      if (canHandle3D) {
        requestAnimationFrame(monitorPerformance);
      }
    };

    requestAnimationFrame(monitorPerformance);

    return () => {
      // Cleanup
    };
  }, [canHandle3D, isSplineLoaded]);

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2,
  //       delayChildren: 0.3,
  //     },
  //   },
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  const LoadingAnimation = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.0000001] h-[0.0000001] rounded-full"
          style={{
            boxShadow: "#170B42FF 0px 0px 150px 90px",
            background: "#0B0974FF",
          }}
        />
        <div className="relative flex gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-3 h-3 bg-white rounded-full animate-bounce`}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Handle Spline load
  const onSplineLoad = (spline: Application): void => {
    setIsSplineLoaded(true);
    if (spline) {
      spline.setZoom(0.8);
    }
  };

  const Fallback = () => (
    <div className="relative w-full h-full min-h-[100vh] sm:min-h-[300px] flex items-center justify-center">
      <Image
        src={HeroGif} // Replace with your fallback GIF path
        alt="3D Animation Fallback"
        width={500}
        height={500}
        className="relative z-10 w-screen h-screen sm:w-full sm:h-auto object-cover sm:object-contain"
        priority
      />
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        {!isSplineLoaded && canHandle3D && <LoadingAnimation />}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isSplineLoaded || !canHandle3D ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex justify-center items-center relative overflow-hidden"
        >
          {canHandle3D ? (
            <div className="w-full h-full relative overflow-hidden">
              <div className="absolute inset-0 -bottom-16 -right-16">
                <Spline
                  scene="https://prod.spline.design/7jKK6gNppukm-Jdr/scene.splinecode"
                  onLoad={onSplineLoad}
                />
              </div>
            </div>
          ) : (
            <Fallback />
          )}
        </motion.div>
      </div>

      {/* Centered "AIDAPTICS" Text Style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
      >
        <h1
          className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-purple-300 to-blue-400 tracking-widest drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)] font-tech mb-6"
          style={{
            fontFamily: "'MyFont', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
          }}
        >
          AIDAPTICS
        </h1>
        <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mb-8"
      >
        We turn Complex ideas into effortless solutions.
      </motion.p>
      <Link href="/get-started" passHref legacyBehavior>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Get Started
          </span>
        </motion.a>
      </Link>
      </motion.div>
    </div>
  );
};
export default Hero;
