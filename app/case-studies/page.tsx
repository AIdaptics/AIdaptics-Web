"use client";
import React from "react";
import NavbarComponent from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { caseStudies } from "./data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

const SectionCard = ({
  title,
  client,
  challenge,
  solution,
  result,
  stack,
  href,
}: {
  title: string;
  client: string;
  challenge: string;
  solution: string[];
  result: string[];
  stack: string;
  href: string;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-black text-white rounded-2xl border border-gray-800 p-6 md:p-7 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-600/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-600/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>

      {/* top-right thumbnail */}
      {href && (
        <Link href={href} className="absolute top-4 right-4 block">
          {/* Image element is injected by parent via children props replacement below */}
        </Link>
      )}

      <h3 className="text-xl md:text-2xl font-bold mb-2">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h3>
      <p className="text-gray-300 mb-4">Client: {client}</p>

      <div className="space-y-4">
        <div>
          <h4 className="text-base font-semibold mb-1">Challenge</h4>
          <p className="text-gray-300 line-clamp-2">{challenge}</p>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-1">Solution</h4>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {solution.slice(0, 2).map((s, i) => (
              <li key={i} className="line-clamp-1">{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-1">Result</h4>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {result.slice(0, 2).map((r, i) => (
              <li key={i} className="line-clamp-1">{r}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <h4 className="text-base font-semibold mb-1">Stack</h4>
          <p className="text-gray-300 line-clamp-1">{stack}</p>
        </div>
      </div>

      <div className="mt-5">
        <Link href={href} className="group relative inline-flex items-center gap-2 rounded-2xl px-4 py-1.5 text-sm font-medium bg-[#212121] shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
          <span className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] p-[1px] ![mask-composite:subtract]" />
          <svg className="size-4 text-[#ffaa40]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none" height={15} width={15}>
            <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" />
          </svg>
          <span className="shrink-0 bg-border w-[1px] h-4" role="none" />
          <span className="inline animate-gradient whitespace-pre bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent [--bg-size:300%] text-center">Read full case study</span>
          <svg strokeLinecap="round" className="text-[#9c40ff]" strokeWidth="1.5" aria-hidden="true" viewBox="0 0 10 10" height={11} width={11} stroke="currentColor" fill="none">
            <path strokeLinecap="round" d="M0 5h7" className="opacity-0 transition group-hover:opacity-100" />
            <path strokeLinecap="round" d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default function CaseStudiesPage() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: caseStudies.map((cs, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://aidaptics.com/case-studies/${cs.slug}`,
                name: cs.title,
              })),
            }),
          }}
        />
      </Head>
      <NavbarComponent />
      <motion.main
        className="max-w-5xl mx-auto px-6 md:px-8 py-10 md:py-14 mt-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-10 md:mb-14 text-center">
          <h1
            className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-purple-300 to-blue-400 tracking-wide drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)] font-tech mb-3"
            style={{ fontFamily: "'MyFont', sans-serif", fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}
          >
            CASE STUDIES
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            AIdaptics builds AI-driven automation systems that turn chaotic processes into
            scalable, reliable growth engines. Explore how we architect, automate, and
            integrate across platforms to deliver measurable results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {caseStudies.map((cs) => (
            <div key={cs.slug} className="relative">
              <SectionCard
                title={cs.title}
                client={cs.client}
                challenge={cs.challenge}
                solution={cs.solution}
                result={cs.result}
                stack={cs.stack}
                href={`/case-studies/${cs.slug}`}
              />
              {cs.thumbnail && (
                <Link href={`/case-studies/${cs.slug}`} className="absolute top-4 right-4 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-16 h-16 md:w-20 md:h-20"
                  >
                    <Image src={cs.thumbnail} alt={`${cs.title} case study thumbnail`} width={96} height={96} className="object-contain w-full h-full" />
                  </motion.div>
                </Link>
              )}
            </div>
          ))}
        </div>

        <motion.section variants={itemVariants} className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What We Build</h2>
          <p className="text-gray-300">
            Core: Node.js, Next.js, React, Supabase, MongoDB, Redis. Automation: GHL, Zapier,
            n8n, Make.com, Typeform, Calendly. AI: GPT integrations, Retell voice AI, vector
            databases. Blockchain: Solana. Analytics & SEO: Google Analytics, schema SEO, data
            pipelines.
          </p>
        </motion.section>

        <motion.div variants={itemVariants} className="mt-8 text-center text-xs text-white/60 px-4">
          <p>
            Disclaimer: All third‑party logos, trademarks, screenshots, and product names shown in these
            case studies are the property of their respective owners and are used for identification and
            illustrative purposes only. AIdaptics may aggregate assets from third‑party sources and will
            promptly remove any item upon request. AIdaptics is not responsible for the accuracy, ownership,
            or ongoing availability of third‑party assets.
          </p>
        </motion.div>
      </motion.main>
      <Footer />
    </>
  );
}

// metadata cannot be exported from a client component; meta is handled via <Head> above if needed


