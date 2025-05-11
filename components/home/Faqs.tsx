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
      question: "Can AI really transform my business operations?",
      answer:
        "Absolutely. Our AI solutions have helped businesses reduce operational costs by up to 40% and increase customer engagement by 300%. Whether it's automating customer support with intelligent chatbots or streamlining workflows with custom scripts, we'll help you leverage AI to create measurable impact.",
    },
    {
      question: "What ROI can I expect from your digital solutions?",
      answer:
        "Our clients typically see significant returns within the first 6 months. Recent projects have delivered 200% increases in lead generation, 45% improvements in customer satisfaction, and 60% reductions in operational costs. We'll work with you to set clear KPIs and track your success metrics.",
    },
    {
      question: "How quickly can you bring my digital vision to life?",
      answer:
        "Speed without compromising quality is our specialty. Most websites launch within 4 weeks, and custom AI solutions within 6-8 weeks. We use an agile approach that gets your core features live fast, then iterates based on real user data. You'll see progress from day one.",
    },
    {
      question: "Will my solution scale as my business grows?",
      answer:
        "That's exactly what we design for. Every solution we build uses scalable architecture and future-proof technology. Whether you're handling 100 or 100,000 users, your digital infrastructure will grow seamlessly with your business.",
    },
    {
      question: "How do you ensure my project stays on budget?",
      answer:
        "Transparency is built into our process. You'll receive detailed cost breakdowns, milestone-based payments, and regular progress updates. We've maintained a 98% on-budget delivery rate across hundreds of projects through careful planning and clear communication.",
    },
    {
      question: "What makes AIdaptics different from other agencies?",
      answer:
        "We're not just developers – we're strategic partners in your growth. Our team brings expertise from working with industry leaders, cutting-edge AI capabilities, and a track record of delivering solutions that drive real business results. Plus, you'll work directly with senior experts, not junior teams.",
    },
    {
      question: "Do you provide ongoing support and updates?",
      answer:
        "Your success is our long-term commitment. Every project includes dedicated support, regular performance optimization, and proactive updates. Our average client partnership spans 3+ years because we continue delivering value long after launch.",
    },
    {
      question: "How do we get started?",
      answer:
        "Let's begin with a strategic consultation. We'll discuss your goals, explore potential solutions, and create a roadmap for your digital transformation. Book your free consultation today, and we'll show you exactly how we can drive your business forward.",
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
