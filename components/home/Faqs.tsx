"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Faq() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqItems = [
  {
    question: "Can AI actually transform my business operations?",
    answer:
      "Yes. AI and automation can radically change how your business runs. Our clients leverage intelligent agents, automated workflows, and custom AI systems to eliminate manual work, reduce operating costs, and dramatically improve user engagement. We build practical implementations that create measurable efficiency gains and revenue impact.",
  },
  {
    question: "What kind of ROI should I expect from your AI and automation solutions?",
    answer:
      "You should expect clear, measurable return on investment within the first 6 months. Clients typically see major rises in qualified leads, lower support costs, higher retention, and streamlined operations. We set data driven KPIs upfront, track performance continuously, and refine models and automations to maximize ROI.",
  },
  {
    question: "How fast can you bring my digital and AI vision to life?",
    answer:
      "Speed with precision is our strength. Standard websites are deployed in about 4 weeks and custom AI automations are production ready in 6 to 8 weeks. Using rapid prototyping and iterative releases, we show real progress early and refine based on actual usage and performance data.",
  },
  {
    question: "Will the solution scale as my business grows and traffic increases?",
    answer:
      "Yes. Scalability is engineered into every system we build. We use robust architecture patterns, cloud native infrastructure, and performance optimization strategies so your apps and AI agents handle growth, spikes in usage, and expanding data loads without breaking performance or reliability.",
  },
  {
    question: "How do you ensure my project stays on budget and avoids scope creep?",
    answer:
      "Budget control is built into our process. We provide transparent cost breakdowns, defined milestones, and regular budget reporting. Combined with agile planning and continuous feedback loops, this results in predictable outcomes and a high on-budget delivery rate across projects.",
  },
  {
    question: "What makes AIdaptics different from other digital and AI agencies?",
    answer:
      "We combine deep technical expertise with strategic execution. You work directly with senior engineers and AI architects who have shipped complex automation and growth systems. We focus on business metrics and technical quality, not just deliverables. Our solutions consistently drive efficiency, scale, and business performance.",
  },
  {
    question: "Do you provide ongoing support, updates and performance optimization?",
    answer:
      "Yes. Ongoing support and performance tuning are core parts of our service. We monitor deployments, push regular updates, optimize models and workflows, and proactively address risks. Our long term client relationships reflect continuous value delivery beyond the initial launch.",
  },
  {
    question: "How do I get started with AIdaptics?",
    answer:
      "Begin with a strategy consultation where we map your growth goals, technical requirements, and opportunity areas. From that session we create a clear implementation roadmap with timelines and success metrics. Schedule your free consultation to start driving measurable business results.",
  },
];


  const handleItemToggle = (value: string) => {
    setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
  };

  return (
    <div
      id="faqs"
      className="relative px-4 py-12 sm:px-6 lg:px-8 lg:min-h-[50rem] min-h-[60rem] max-w-screen-2xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-8">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-white"
            style={{ fontFamily: "'MyFont', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="relative w-full aspect-square max-w-[300px] mx-auto lg:mx-0 sm:block hidden">
            <Image
              src="/faq1.png"
              alt="FAQ Image"
              fill
              className="object-contain"
              priority
              unoptimized={true}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-2/3">
          <Accordion
            type="multiple"
            value={openItems}
            className="w-full space-y-3 sm:space-y-4"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={`item-${index}`}
                value={`item-${index}`}
                className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-300"
              >
                <AccordionTrigger
                  onClick={() => handleItemToggle(`item-${index}`)}
                  className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-left bg-muted/10 hover:bg-muted/25 transition-colors"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-muted/10 min-h-[80px]">
                  <motion.div
                    layout="position"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Decorative Image */}
      <div className="hidden sm:block absolute top-0 -z-10 right-0 w-32 sm:w-48 h-32 sm:h-48 overflow-hidden">
        <Image
          src="/faq2.png"
          alt="FAQ Image 2"
          fill
          className="object-contain"
          unoptimized={true}
        />
      </div>
    </div>
  );
}
