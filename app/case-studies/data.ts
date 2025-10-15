export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  challenge: string;
  solution: string[];
  result: string[];
  stack: string;
  thumbnail?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pb-trading-discord-automation",
    title: "PB Trading — Intelligent Discord Automation",
    client: "PB Trading (132,000+ members)",
    challenge:
      "Massive community with no structured data or lead capture; Discord generated 0 leads.",
    solution: [
      "Built a Redis-powered Discord bot for verification, tracking, and booking",
      "Integrated Calendly API for instant call confirmations",
      "Automated user journey: join → verify → schedule → access grant",
    ],
    result: [
      "70% increase in lead generation",
      "Automated follow-ups and CRM syncing",
      "Reduced manual moderation and tracking by 90%",
    ],
    stack: "Python, Redis, Calendly API",
    thumbnail: "https://cdn.discordapp.com/icons/1171967554420486144/a_7334bb608e5a4abd53c92cf0974cd90a.gif?size=512",
  },
  {
    slug: "creator-automation-suite",
    title: "Creator Automation Suite — Newsletter + CRM + Lead Flow",
    client: "Creator with 2.7K+ Beehive subscribers",
    challenge:
      "Manual workflows across Beehive, Typeform, Calendly, and GHL with poor segmentation.",
    solution: [
      "Typeform → Zapier → GHL pipeline to sync new leads",
      "Automated Beehive segmentation: Whop purchases → tag 'Customer'; else 7‑day nurture",
      "Calendly integration to check purchase status before booking",
      "GHL workflows to assign tags, update stages, and trigger follow-ups",
    ],
    result: [
      "Unified CRM and email ecosystem",
      "100% accurate lead tracking from Typeform to GHL",
      "Fully automated Beehive segmentation → fewer manual steps, higher conversions",
    ],
    stack: "GHL, Zapier, Beehive API, Typeform, Calendly, Redis",
    thumbnail: "https://cdn.discordapp.com/attachments/1407469950163226684/1413519182049579159/71dc75390a6aa1a0bb2d5dfd6fa03915.webp?ex=68f0f5d2&is=68efa452&hm=ed9d441331fa079999ed2c75b170cabfb2a32eef8cdbb30427f4f380f8579fb8",
  },
  {
    slug: "growthops-agency-ops",
    title: "GrowthOps Agency — High-Volume Lead & Client Management",
    client: "Growth operations consultant (15+ clients/month, $10k+ each)",
    challenge:
      "Fast scaling caused chaotic lead/workflow management, missed updates, and lost leads.",
    solution: [
      "GHL automations and pipelines for lead status and conversion tracking",
      "Typeform → Make.com → Airtable syncs between client forms and internal sheets",
      "Custom Airtable dashboards for client transparency",
      "Automated percentage tracking and Zapier-powered notifications",
    ],
    result: [
      "Saved dozens of work hours weekly",
      "Prevented loss of thousands in untracked leads",
      "Enabled founder to manage high-value clients without burnout",
    ],
    stack: "GHL, Make.com, Zapier, n8n, Airtable, Typeform",
    thumbnail: "/file.svg",
  },
  {
    slug: "instagram-dm-ai-responder",
    title: "Instagram DM → AI Response System",
    client: "E‑commerce brand with high DM volume",
    challenge: "Manual handling of thousands of product-pricing and availability DMs.",
    solution: [
      "Instagram DM → ManyChat → n8n webhook",
      "n8n checks keywords and a vector database of FAQs",
      "Known queries: fetch pricing from Google Sheets or WatchAPI",
      "Unknown queries: forward to Telegram for human review",
      "Automated, human-like reply sent back on Instagram",
    ],
    result: [
      "Automated 90% of daily DM responses",
      "Reduced manual support to <10%",
      "Real‑time updates on pricing and new SKUs",
    ],
    stack: "n8n, ManyChat, Telegram API, Google Sheets API, WatchAPI",
    thumbnail: "https://cdn.discordapp.com/attachments/1428075084811206716/1428078312647032862/image.png?ex=68f13112&is=68efdf92&hm=4a1d9f6c18fd4e25dbdf85872eba2b3c23442266c4b5a5664e4397b679f92969",
  },
  {
    slug: "dermal-spa-voice-agent",
    title: "Dermal Spa (Guam) — Website + AI Voice Agent",
    client: "High-end skincare clinic offering 110+ services",
    challenge:
      "High call volume and manual scheduling caused missed bookings and operational chaos.",
    solution: [
      "Next.js website with booking system and MongoDB/Supabase backend",
      "Admin dashboard for daily booking management",
      "AI voice agent using Retell AI that identifies callers and books via n8n",
    ],
    result: [
      "24/7 booking coverage",
      "Increased appointment conversion rate",
      "Decreased front desk workload by 60%",
    ],
    stack: "Next.js, Supabase, Retell AI, n8n, Twilio API",
    thumbnail: "https://cdn.discordapp.com/attachments/1428075084811206716/1428078633645510756/images.png?ex=68f1315e&is=68efdfde&hm=93a427e48474147b1333d9385622de4dfd2a31bf02def285dd04201538d4cf43",
  },
  {
    slug: "pharma-blockchain-verification",
    title: "Pharmaceutical Blockchain Verification",
    client: "Pharma distributor ensuring product authenticity",
    challenge: "Need to verify medicine batches and eliminate counterfeit risk.",
    solution: [
      "Solana-based verifier for batch tracking",
      "TX hash + batch data stored redundantly in Supabase",
      "Scan or enter batch ID for instant legitimacy check",
    ],
    result: [
      "Eliminated counterfeit risk",
      "Increased consumer trust and transparency",
      "Scalable verification for all future batches",
    ],
    stack: "Solana Smart Contracts, Supabase, Next.js",
    thumbnail: "https://cdn.discordapp.com/attachments/1428075084811206716/1428079551765811351/favicon.png?ex=68f13239&is=68efe0b9&hm=a55e585586880a9b7673c778f240012c9375bf495d09540818a3e2f2aecc8bd2",
  },
];


