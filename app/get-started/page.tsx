"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { PhoneInput } from "@/components/ui/phone-input";
import type { Value } from "react-phone-number-input";

export default function GetStarted() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "" as Value,
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: Value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format data for Discord webhook
      const webhookData = {
        embeds: [
          {
            title: "🚀 New Project Inquiry",
            description: "A new project inquiry has been submitted.",
            color: 0x5865F2, // Discord blue color
            fields: [
              { name: "👤 Name", value: formData.name, inline: true },
              { name: "🏢 Company", value: formData.company || "Not specified", inline: true },
              { name: "📧 Email", value: formData.email, inline: false },
              { name: "📱 Phone", value: formData.phone, inline: true },
              { name: "📝 Message", value: formData.message, inline: false },
            ],
            footer: {
              text: "AIdaptics Get-Started Form",
              icon_url: "https://aidaptics-web.vercel.app/favicon.ico",
            },
            timestamp: new Date().toISOString(),
          },
        ],
      };

      // Send data to API route
      const response = await fetch('/api/SendInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }
      
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "" as Value,
        message: ""
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Failed to submit form",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <Toaster />
      
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl sm:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "'MyFont', sans-serif" }}
          >
            Get Started with AIdaptics
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Fill out the form below and our team will get back to you within 24 hours to discuss how we can help transform your business with AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/35 via-blue-500/10 to-cyan-400/35 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.7)]"
        >
          <div className="rounded-[1.05rem] p-6 sm:p-8 bg-black/80 border border-gray-800">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-400 mb-6">
                Thank you for reaching out. Our team will contact you shortly.
              </p>
              <button 
                onClick={() => setIsSuccess(false)} 
                className="px-4 py-2 border border-indigo-500 text-indigo-400 rounded-md hover:bg-indigo-950/30 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">Full Name</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jariullah" 
                    className={`w-full px-4 py-3 bg-[#0f1624] border transition-all text-sm ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#1f2a3d] hover:border-[#2a3a55] focus:border-[#4f82ff] focus:ring-[#4f82ff]/20'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Company Field */}
                <div>
                  <label htmlFor="company" className="block text-white font-medium mb-2">Company (Optional)</label>
                  <input 
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="AIdaptics, LLC" 
                    className="w-full px-4 py-3 bg-[#0f1624] border border-[#1f2a3d] hover:border-[#2a3a55] focus:border-[#4f82ff] rounded-lg text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-[#4f82ff]/20 text-sm"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hi@aidaptics.com" 
                    className={`w-full px-4 py-3 bg-[#0f1624] border transition-all text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#1f2a3d] hover:border-[#2a3a55] focus:border-[#4f82ff] focus:ring-[#4f82ff]/20'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">Phone Number</label>
                  <PhoneInput
                    defaultCountry="US"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..." 
                  rows={5}
                  className={`w-full px-4 py-3 bg-[#0f1624] border transition-all resize-none text-sm ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#1f2a3d] hover:border-[#2a3a55] focus:border-[#4f82ff] focus:ring-[#4f82ff]/20'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button 
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#4b8df7] hover:to-[#2f6eee] text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-[#4f82ff]/35"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
          </div>
        </motion.div>
      </div>
    </div>
          <Footer />
    </>
  );
}
