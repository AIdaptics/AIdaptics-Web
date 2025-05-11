"use client";

import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
}

interface StatCardProps {
  value: string;
  label: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div id="services" className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        movementDuration={2}
      />
      <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div className="w-fit rounded-lg border border-gray-600 p-2">
            {icon}
          </div>
          <div className="space-y-3">
            <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem]">
              {title}
            </h3>
            <p className="font-sans text-sm/[1.125rem] text-gray-400 md:text-base/[1.375rem]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
      <GlowingEffect 
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        movementDuration={2}
      />
      <div className="border-0.75 relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-400 mb-2">{value}</div>
            <div className="text-gray-400">{label}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyChooseAIdaptics: React.FC = () => {
  return (
    <section  id="services" className="py-16 px-4 bg-black text-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-3">
          Why Choose <span className="text-indigo-400">AIdaptics</span>
        </h2>
        
        <p className="text-white/70 text-center max-w-3xl mx-auto mb-12">
          Join industry leaders who trust AIdaptics to drive innovation and growth 
          through advanced artificial intelligence solutions.
        </p>
        
        {/* Feature Cards - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>}
            iconBgColor=""
            title="Enterprise-Grade Security"
            description="Bank-level encryption and security protocols protect your data. SOC 2 Type II and GDPR compliant."
          />
          
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>}
            iconBgColor=""
            title="Lightning-Fast Implementation"
            description="Get up and running in days, not months. Our streamlined process ensures quick deployment with minimal disruption."
          />
          
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>}
            iconBgColor=""
            title="Dedicated AI Experts"
            description="Work with a team of AI specialists who understand your industry and business objectives."
          />
        </div>
        
        {/* Feature Cards - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>}
            iconBgColor=""
            title="Customized Solutions"
            description="Tailored AI implementations that adapt to your specific business needs and integrate seamlessly."
          />
          
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>}
            iconBgColor=""
            title="Proven ROI"
            description="Average 300% ROI within first year. Clear metrics and analytics track your success."
          />
          
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>}
            iconBgColor=""
            title="24/7 Support"
            description="Round-the-clock expert support ensures your AI systems run smoothly and efficiently."
          />
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard value="98%" label="Client Satisfaction" />
          <StatCard value="300%" label="Average ROI" />
          <StatCard value="24/7" label="Expert Support" />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAIdaptics;