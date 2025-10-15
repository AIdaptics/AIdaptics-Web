"use client";
import React from "react";
import type { Metadata } from "next";
import { useParams, notFound } from "next/navigation";
import NavbarComponent from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { motion } from "framer-motion";
import { caseStudies } from "../data";
import Link from "next/link";
import Head from "next/head";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

export default function CaseStudyDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore next/navigation's notFound is only available in server components
    return notFound?.() ?? null;
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://aidaptics.com/" },
                { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://aidaptics.com/case-studies" },
                { "@type": "ListItem", position: 3, name: cs.title, item: `https://aidaptics.com/case-studies/${cs.slug}` },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: cs.title,
              description: cs.challenge,
              author: { "@type": "Organization", name: "AIdaptics" },
              publisher: { "@type": "Organization", name: "AIdaptics" },
              mainEntityOfPage: `https://aidaptics.com/case-studies/${cs.slug}`,
              image: cs.thumbnail ? [`https://aidaptics.com${cs.thumbnail}`] : undefined,
            }),
          }}
        />
      </Head>
      <NavbarComponent />
      <motion.main
        className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16 mt-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-sm text-gray-400 mb-2">Case Study</p>
          <h1 className="text-3xl md:text-4xl font-bold">{cs.title}</h1>
          <p className="text-gray-300 mt-2">Client: {cs.client}</p>
        </motion.div>

        <motion.section variants={itemVariants} className="bg-black text-white rounded-2xl border border-gray-800 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="space-y-6 relative z-10">
            <div>
              <h2 className="text-xl font-semibold mb-1">Challenge</h2>
              <p className="text-gray-300">{cs.challenge}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-1">Solution</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {cs.solution.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-1">Result</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {cs.result.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-1">Stack</h2>
              <p className="text-gray-300">{cs.stack}</p>
            </div>
          </div>
        </motion.section>

        {cs.slug === "pb-trading-discord-automation" && (
          <>
            <motion.section variants={itemVariants} className="mt-8 space-y-6">
              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h2 className="text-2xl font-bold mb-2">🧠 Case Study: How AIdaptics Engineered a 70% Lead Boost</h2>
                <p className="text-gray-300">
                  We transformed a 132,000+ member Discord into a measurable, automated lead engine by
                  combining Redis for real-time state, Calendly for conversion checkpoints, and Discord
                  role automation for seamless access control.
                </p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">📍 Client Overview</h3>
                <p className="text-gray-300 mb-2"><strong>Client:</strong> PB Trading (through Braeden Barkmeier — Info Scaler & Automation Strategist)</p>
                <p className="text-gray-300 mb-2"><strong>Industry:</strong> Trading Education / Community Automation</p>
                <p className="text-gray-300"><strong>Services Provided:</strong> Discord Lead Automation, Redis Database Architecture, Calendly API Integration, Workflow Optimization</p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🚀 The Challenge</h3>
                <p className="text-gray-300">
                  Despite a huge audience, Discord generated zero measurable leads. No tracking of user
                  intent, bookings, or funnel progress; heavy manual ops and no conversion clarity.
                </p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">💡 The Objective</h3>
                <blockquote className="border-l-2 border-indigo-600 pl-4 text-gray-300">
                  Turn the community into a fully automated lead generation and qualification funnel — a
                  mini‑CRM inside Discord with real‑time tracking and bookings.
                </blockquote>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 space-y-3">
                <h3 className="text-lg font-semibold">🧠 Our Approach</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Capture user intent directly from Discord interactions</li>
                  <li>Track every action in Redis for millisecond decisions</li>
                  <li>Use Calendly webhooks for real‑time booking confirmations</li>
                  <li>Automate roles and channel access based on state</li>
                  <li>Provide admin slash commands for visibility and exports</li>
                </ul>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 space-y-4">
                <h3 className="text-lg font-semibold">⚙️ The Technical Build</h3>
                <div>
                  <h4 className="font-semibold mb-1">1) Redis: Real‑Time State</h4>
                  <p className="text-gray-300">Tracks clicks, bookings, verification, and access level; powers logic instantly.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">2) Calendly API</h4>
                  <p className="text-gray-300">Webhooks confirm bookings, update Redis, and grant gated channel access.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">3) Smart Role Automation</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>User joins → Onboarding message</li>
                    <li>Books call → Redirect via Calendly</li>
                    <li>Confirms → Auto‑tag + private access</li>
                    <li>Missed → Follow‑up DM reminders</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">4) Admin Commands</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>/stats — real‑time KPIs</li>
                    <li>/export — CSV reports</li>
                    <li>/remind — targeted reminders</li>
                  </ul>
                </div>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-3">📊 The Results</h3>
                <table className="min-w-[560px] w-full text-left text-gray-200">
                  <thead className="text-gray-400">
                    <tr>
                      <th className="py-2 pr-4">KPI</th>
                      <th className="py-2 pr-4">Before</th>
                      <th className="py-2">After</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Lead Conversion (Discord → Booking)</td>
                      <td className="py-2 pr-4">~0%</td>
                      <td className="py-2">70% increase</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Average Weekly Call Bookings</td>
                      <td className="py-2 pr-4">&lt;10</td>
                      <td className="py-2">100+</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Manual Admin Time</td>
                      <td className="py-2 pr-4">4+ hours/day</td>
                      <td className="py-2">20 minutes/day</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🏗️ Tech Stack Summary</h3>
                <p className="text-gray-300">
                  Framework: Node.js, Discord.js · Database: Redis · Integrations: Calendly API, Webhooks, Google Sheets · Hosting: AWS Lambda · Admin: Slash Commands, Exports, Reminders
                </p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">⚡ Key Outcomes</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>70% lead generation increase within 30 days</li>
                  <li>10× more Calendly bookings</li>
                  <li>90% reduction in manual operations</li>
                  <li>Repeatable framework deployed for multiple communities</li>
                </ul>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🧭 Conclusion</h3>
                <p className="text-gray-300">
                  Audience size means little without intelligent systems. With Redis + Calendly + Discord API, we engineered a self‑optimizing lead engine for PB Trading.
                </p>
                <p className="text-gray-300 mt-3">
                  Contact: <a href="mailto:hi@aidaptics.com" className="underline text-indigo-400">hi@aidaptics.com</a>
                </p>
              </div>
            </motion.section>
          </>
        )}

        {cs.slug === "pharma-blockchain-verification" && (
          <>
            <motion.section variants={itemVariants} className="mt-8 space-y-6">
              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h2 className="text-2xl font-bold mb-2">💊 Case Study: Pharmaceutical Blockchain Verification — Transparent Medicine Tracking with Solana</h2>
                <p className="text-gray-300">A working prototype demonstrating secure, decentralized tracking of medicine batches using Solana smart contracts with a Supabase redundancy layer.</p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">📍 Project Overview</h3>
                <p className="text-gray-300 mb-2"><strong>Client Type:</strong> Internal Research / College Collaboration</p>
                <p className="text-gray-300 mb-2"><strong>Industry:</strong> Pharmaceutical Technology, Blockchain, Supply Chain Verification</p>
                <p className="text-gray-300"><strong>Services Provided:</strong> Blockchain Architecture, Smart Contracts, Web Interface, Batch Traceability, Supabase Integration</p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🚀 The Challenge</h3>
                <p className="text-gray-300">Counterfeit medicine is widespread; traditional verification is tamperable. We explored whether on‑chain verification could make authenticity provable.</p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">💡 The Objective</h3>
                <blockquote className="border-l-2 border-indigo-600 pl-4 text-gray-300">Design a blockchain system to trace legitimacy of pharmaceutical batches, verifiable by consumers and dealers instantly.</blockquote>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 space-y-3">
                <h3 className="text-lg font-semibold">🧠 Our Approach</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-1">
                  <li>Blockchain layer (Solana) — immutable storage</li>
                  <li>Off‑chain layer (Supabase) — redundancy + fast reads</li>
                  <li>Web portal — batch verification UI</li>
                </ol>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 space-y-4">
                <h3 className="text-lg font-semibold">⚙️ The Technical Build</h3>
                <div>
                  <h4 className="font-semibold mb-1">1) Solana Smart Contracts</h4>
                  <p className="text-gray-300">Each batch represented as a tokenized entry storing batch_id, manufacture/expiry dates, manufacturer/dealer wallets, and tx hash. Immutable once written.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">2) Supabase Off‑Chain Cache</h4>
                  <p className="text-gray-300">Stores medicine details, dealer contacts, distribution region, and tx references for quick lookups; hashes cross‑verified on chain.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">3) Verification Portal</h4>
                  <p className="text-gray-300">Next.js app to scan/enter batch ID, fetch on‑chain status, and display legitimacy and transaction details.</p>
                </div>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-3">🧪 The Workflow</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-1">
                  <li>Manufacturer creates batch and submits details</li>
                  <li>Transaction written to Solana → returns tx hash</li>
                  <li>Hash + metadata stored in Supabase</li>
                  <li>Dealers/customers verify via web → cross-reference on chain</li>
                </ol>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-3">📊 The Results</h3>
                <table className="min-w-[520px] w-full text-left text-gray-200">
                  <thead className="text-gray-400">
                    <tr>
                      <th className="py-2 pr-4">Metric</th>
                      <th className="py-2">Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Verification Latency</td>
                      <td className="py-2">&lt;2s via off‑chain cache</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Blockchain Confirmation</td>
                      <td className="py-2">~0.6s (Solana)</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Query Reliability</td>
                      <td className="py-2">99.7% verified accuracy</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">UI Feedback</td>
                      <td className="py-2">“Extremely intuitive”</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🏗️ Tech Stack Summary</h3>
                <p className="text-gray-300">Blockchain: Solana (Rust) · Backend: Supabase (PostgreSQL) · Frontend: Next.js · Deployment: Vercel + Solana Web3.js · Integration: QR Code API</p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🧭 Conclusion</h3>
                <p className="text-gray-300">Hybrid architecture (Solana + Supabase) delivers trust and speed, forming a reusable blueprint for broader supply‑chain verification.</p>
                <p className="text-gray-300 mt-3">Contact: <a href="mailto:hi@aidaptics.com" className="underline text-indigo-400">hi@aidaptics.com</a></p>
              </div>
            </motion.section>
          </>
        )}

        {cs.slug === "dermal-spa-voice-agent" && (
          <>
            <motion.section variants={itemVariants} className="mt-8 space-y-6">
              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h2 className="text-2xl font-bold mb-2">💬 Case Study: Booking Platform + AI Voice Agent for a Dermal Skin Care Spa (Guam)</h2>
                <p className="text-gray-300">
                  We built a complete booking ecosystem — website, booking system, admin dashboard, and an AI voice agent — to eliminate missed calls and automate operations.
                </p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">📍 Client Overview</h3>
                <p className="text-gray-300 mb-2"><strong>Client:</strong> Dermal Skin Care Spa (via Hexona Systems, outsourcing partner)</p>
                <p className="text-gray-300 mb-2"><strong>Industry:</strong> Health & Beauty / Wellness Automation</p>
                <p className="text-gray-300"><strong>Services Provided:</strong> Website, Booking System, Admin Dashboard, AI Voice Booking Agent, SEO</p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🚀 The Challenge</h3>
                <p className="text-gray-300">
                  Manual phone bookings, missed calls, no centralized data, and a website that underperformed in local search — despite offering 110+ premium services.
                </p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">💡 The Objective</h3>
                <blockquote className="border-l-2 border-indigo-600 pl-4 text-gray-300">
                  Build a web platform, admin interface, and an AI voice agent that books appointments automatically — while handling 100+ services and real‑time availability.
                </blockquote>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 space-y-4">
                <h3 className="text-lg font-semibold">⚙️ The Technical Build</h3>
                <div>
                  <h4 className="font-semibold mb-1">1) Website & Booking Platform</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Next.js website optimized for speed and SEO</li>
                    <li>Dynamic services engine for 110+ treatments via Supabase</li>
                    <li>Smart booking form with email/SMS confirmations</li>
                    <li>Admin dashboard to view/update daily bookings and histories</li>
                    <li>Hybrid DB: Supabase (users) + MongoDB (fast booking queries)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">2) AI Voice Booking Agent</h4>
                  <ol className="list-decimal list-inside text-gray-300 space-y-1">
                    <li>Caller greeted by Retell AI agent</li>
                    <li>n8n workflow checks availability in Supabase</li>
                    <li>Agent confirms and books automatically</li>
                    <li>Complex requests alert admins via Telegram</li>
                  </ol>
                  <p className="text-gray-300 mt-2">Natural language handled via speech‑to‑intent mapping for conversational booking.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">3) SEO & Local Discovery</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Rich metadata and schema for services</li>
                    <li>Google Business Profile and local content optimization</li>
                    <li>Sub‑1.2s page loads for better ranking</li>
                  </ul>
                </div>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-3">📊 The Results</h3>
                <table className="min-w-[560px] w-full text-left text-gray-200">
                  <thead className="text-gray-400">
                    <tr>
                      <th className="py-2 pr-4">Metric</th>
                      <th className="py-2 pr-4">Before</th>
                      <th className="py-2">After</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Appointment System</td>
                      <td className="py-2 pr-4">Manual calls</td>
                      <td className="py-2">Full web + AI automation</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Missed Calls</td>
                      <td className="py-2 pr-4">~25% daily</td>
                      <td className="py-2">Near zero</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Admin Booking Time</td>
                      <td className="py-2 pr-4">3–4 hours/day</td>
                      <td className="py-2">15–20 minutes/day</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Local Search Traffic</td>
                      <td className="py-2 pr-4">&lt;10%</td>
                      <td className="py-2">53% from Guam searches</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🏗️ Tech Stack Summary</h3>
                <p className="text-gray-300">Frontend: Next.js, TailwindCSS · Backend: Supabase, MongoDB · Automation: n8n, Telegram API · AI: Retell AI, Twilio · SEO: Schema + GSC</p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🧭 Conclusion</h3>
                <p className="text-gray-300">Combining voice AI with a scalable booking platform eliminated missed calls and manual overhead while improving local discovery.</p>
                <p className="text-gray-300 mt-3">Contact: <a href="mailto:hi@aidaptics.com" className="underline text-indigo-400">hi@aidaptics.com</a></p>
              </div>
            </motion.section>
          </>
        )}

        {cs.slug === "creator-automation-suite" && (
          <>
            <motion.section variants={itemVariants} className="mt-8 space-y-6">
              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h2 className="text-2xl font-bold mb-2">⚙️ Case Study: End-to-End Automation Suite for a 2.7K-Subscriber Creator</h2>
                <p className="text-gray-300">
                  Built a smart automation stack across Beehive, GHL, Typeform, Calendly, and Whop to create a single source of truth for segmentation and email automation.
                </p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">📍 Client Overview</h3>
                <p className="text-gray-300 mb-2"><strong>Client:</strong> AJ Trading (through Volodymyr Maruysch, Info Scaler & Funnel Consultant)</p>
                <p className="text-gray-300 mb-2"><strong>Industry:</strong> Digital Education / Trading Content Creator Automation</p>
                <p className="text-gray-300"><strong>Services Provided:</strong> Beehive Segmentation, GHL Workflows, Typeform + Zapier + Calendly Integration, Subscription Tagging</p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🚀 The Challenge</h3>
                <p className="text-gray-300">
                  Fast-growing audience (2.7K+ on Beehive) with manual tracking, scattered workflows, and no shared context between tools. Wrong emails sent to customers and missed leads.
                </p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">💡 The Objective</h3>
                <blockquote className="border-l-2 border-indigo-600 pl-4 text-gray-300">
                  Connect Beehive, GHL, Typeform, Calendly, and payment data into a unified, automated funnel with precise tagging and journeys.
                </blockquote>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 space-y-3">
                <h3 className="text-lg font-semibold">🧠 Our Approach</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>End-to-end tagging and conditional routing</li>
                  <li>Prevent double-sends and ensure context-aware comms</li>
                  <li>Keep tools in sync automatically, no manual updates</li>
                </ul>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 space-y-4">
                <h3 className="text-lg font-semibold">⚙️ The Technical Build</h3>
                <div>
                  <h4 className="font-semibold mb-1">1) Typeform → Zapier → GHL</h4>
                  <p className="text-gray-300">Create/update contacts in GHL with tags: new_lead, purchased, first_user; trigger workflows immediately.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">2) Beehive: Smart Segmentation</h4>
                  <p className="text-gray-300">Check Whop for purchase; Not Purchased → 7‑day nurture then newsletter; Purchased → customer-only content. Synced via Beehive API + Zapier + Redis.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">3) Calendly & Whop</h4>
                  <p className="text-gray-300">Calendly webhooks verify bookings against Whop; update GHL/Beehive to avoid duplicate follow-ups.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">4) Backend Logic Layer</h4>
                  <p className="text-gray-300">Redis stores transient state for fast, reliable cross-tool syncing beyond Zapier’s rate limits.</p>
                </div>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-3">📊 The Results</h3>
                <table className="min-w-[560px] w-full text-left text-gray-200">
                  <thead className="text-gray-400">
                    <tr>
                      <th className="py-2 pr-4">Metric</th>
                      <th className="py-2 pr-4">Before</th>
                      <th className="py-2">After</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Manual Data Updates</td>
                      <td className="py-2 pr-4">~3–5 hrs/week</td>
                      <td className="py-2">0 hrs (fully automated)</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Wrong Emails Sent</td>
                      <td className="py-2 pr-4">Frequent</td>
                      <td className="py-2">Eliminated</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Lead Response Time</td>
                      <td className="py-2 pr-4">2–3 hrs</td>
                      <td className="py-2">Instant (seconds)</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Email CTR (first 7 days)</td>
                      <td className="py-2 pr-4">7%</td>
                      <td className="py-2">15%+</td>
                    </tr>
                    <tr className="border-t border-gray-800">
                      <td className="py-2 pr-4">Nurture-to-Purchase Conversion</td>
                      <td className="py-2 pr-4">Untracked</td>
                      <td className="py-2">15% increase</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🏗️ Tech Stack Summary</h3>
                <p className="text-gray-300">Automation: GHL, Zapier, Typeform, Calendly · Email: Beehive · DB: Redis · Payment: Whop API · Logic: Node.js microservice</p>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">⚡ Key Outcomes</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>100% automated sync across tools</li>
                  <li>Instant tagging and segmentation by purchase behavior</li>
                  <li>15%+ higher nurture conversions</li>
                  <li>Zero human data handling</li>
                </ul>
              </div>

              <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">🧭 Conclusion</h3>
                <p className="text-gray-300">
                  Even solo creators can run enterprise-grade systems when their tools are connected by a context-aware automation layer.
                </p>
                <p className="text-gray-300 mt-3">Contact: <a href="mailto:hi@aidaptics.com" className="underline text-indigo-400">hi@aidaptics.com</a></p>
              </div>
            </motion.section>
          </>
        )}

        <motion.section variants={itemVariants} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-2">Objectives</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Define clear KPIs and success metrics</li>
              <li>Automate the highest‑leverage workflows first</li>
              <li>Ensure data integrity across integrated systems</li>
            </ul>
          </div>
          <div className="bg-black text-white rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-2">Outcomes</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Operational time savings and higher conversion</li>
              <li>Real‑time visibility for teams and stakeholders</li>
              <li>Scalable architecture for future growth</li>
            </ul>
          </div>
        </motion.section>

        <motion.div variants={itemVariants} className="mt-8">
          <Link href="/case-studies" className="text-indigo-400 hover:text-indigo-300 underline">← Back to all case studies</Link>
        </motion.div>
      </motion.main>
      {/* Related case studies */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 pb-12">
        <motion.section variants={itemVariants} initial="hidden" animate="visible" className="mt-4">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Related case studies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies
              .filter((c) => c.slug !== cs.slug)
              .slice(0, 4)
              .map((c) => (
                <Link key={c.slug} href={`/case-studies/${c.slug}`} className="block bg-black text-white rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{c.title}</h4>
                      <p className="text-gray-400 line-clamp-2">{c.challenge}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}

// SEO metadata (client route fallback for app router; main metadata should be via generateMetadata on server)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return {};
  const title = `${cs.title} | AIdaptics Case Study`;
  const description = `${cs.client}: ${cs.challenge}`.slice(0, 160);
  const url = `https://aidaptics.com/case-studies/${cs.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "AIdaptics",
      images: cs.thumbnail ? [{ url: cs.thumbnail }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cs.thumbnail ? [cs.thumbnail] : undefined,
    },
  };
}


