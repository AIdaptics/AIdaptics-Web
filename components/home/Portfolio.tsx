import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion, AnimatePresence } from "framer-motion";

// Example project data
const projects = [
  {
    id: "clarity-stream",
    name: "Clarity Stream",
    description:
      "A real-time video analytics platform leveraging AI for instant insights.",
    image: "/videos/clarity-stream.webm", // Video preview
    thumbnail: "/AIdaptics.png", // Fallback image
    tags: ["AI", "Video", "Analytics"],
    link: "https://clarity-stream.example.com",
  },
  {
    id: "aidaptics-website",
    name: "AIdaptics Website",
    description:
      "The official AIdaptics website, built with Next.js and modern UI/UX.",
    image: "/AIdaptics.png",
    thumbnail: "/AIdaptics.png",
    tags: ["Web", "Next.js", "Brand"],
    link: "https://aidaptics.com",
  },
  {
    id: "quantum-visualizer",
    name: "Quantum Visualizer",
    description:
      "Interactive quantum computing visualizations for education and research.",
    image: "/quantum (1).gif",
    thumbnail: "/quantum (1).gif",
    tags: ["Education", "Visualization"],
    link: "https://quantum-visualizer.example.com",
  },
];

const categories = ["ALL", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

type Project = typeof projects[number];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.tags.includes(selectedCategory));

  // Ensure currentIndex is valid
  React.useEffect(() => {
    if (currentIndex >= filteredProjects.length) {
      setCurrentIndex(0);
    }
  }, [selectedCategory, filteredProjects.length, currentIndex]);

  const current = filteredProjects[currentIndex] || null;

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  // Card rendering logic
  const renderCard = (project: Project) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.96 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 32px 0 rgba(80,80,255,0.15)" }}
      className="relative w-full max-w-xs sm:max-w-sm rounded-2xl border border-gray-800 p-3 sm:p-4 bg-black shadow-lg flex flex-col gap-4 items-center overflow-hidden z-10 mx-auto"
    >
      <GlowingEffect
        blur={0}
        borderWidth={2}
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        movementDuration={2}
        className="z-0"
      />
      <div className="relative w-full aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-gray-900 mb-2">
        {project.image.endsWith(".webm") ? (
          <motion.video
            key={project.image}
            src={project.image}
            poster={project.thumbnail}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={project.image}
              alt={project.name}
              width={220}
              height={120}
              className="w-full h-full object-cover rounded-xl"
              unoptimized={true}
            />
          </motion.div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-2 z-10 w-full">
        <motion.h3
          className="text-lg font-bold mb-1"
          style={{ fontFamily: "'MyFont', sans-serif" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {project.name}
        </motion.h3>
        <motion.p
          className="text-gray-300 mb-1 text-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {project.description}
        </motion.p>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tags.map((tag: string) => (
            <motion.span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-indigo-900/40 text-indigo-300 text-[10px] font-semibold tracking-wide border border-indigo-700 cursor-pointer hover:bg-indigo-700/60 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.12, backgroundColor: "#6366f1", color: "#fff" }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => { setSelectedCategory(tag); setCurrentIndex(0); }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        {selectedCategory !== "ALL" && (
          <div className="flex gap-2 mt-2">
            <Button onClick={handlePrev} variant="outline" size="sm" disabled={filteredProjects.length <= 1}>
              &#8592; Prev
            </Button>
            <Button onClick={handleNext} variant="outline" size="sm" disabled={filteredProjects.length <= 1}>
              Next &#8594;
            </Button>
          </div>
        )}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-1"
        >
          <Button variant="secondary" size="sm">
            Visit Project
          </Button>
        </a>
      </div>
    </motion.div>
  );

  return (
    <section className="w-full min-h-[60vh] py-10 px-1 sm:px-4 bg-black text-white flex flex-col items-center justify-center">
      <h2
        className="text-4xl font-bold text-center mb-8"
        style={{ fontFamily: "'MyFont', sans-serif" }}
      >
        Portfolio
      </h2>
      {/* Category Sub-navbar (tags only) */}
      <nav className="flex gap-2 mb-8 flex-wrap justify-center">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            className="transition-all duration-200 px-4 py-1 text-xs font-semibold"
            onClick={() => { setSelectedCategory(cat); setCurrentIndex(0); }}
          >
            {cat}
          </Button>
        ))}
      </nav>
      {/* Card UI with animation */}
      <div className="relative w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedCategory === "ALL" ? (
            <motion.div
              key="all-projects"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {projects.map((p) => renderCard(p))}
            </motion.div>
          ) : (
            current && renderCard(current)
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}