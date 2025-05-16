"use client";
import React from 'react';
import NavbarComponent from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';


const CookiePolicyPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <>
      <NavbarComponent />
      <motion.div 
        className="max-w-4xl mx-auto px-6 py-12 mt-24" // Added mt-24 for spacing after navbar
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl font-bold font-syne mb-8"
          variants={itemVariants}
        >
          Strict Cookie Policy
        </motion.h1>
        
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Our Commitment to Privacy</h2>
          <p className="mb-4">
            At AIdaptics, we take your privacy seriously. We maintain a strict approach to cookies and 
            only use them when absolutely necessary for the functioning of our website. We prioritize 
            your privacy and data security above all else.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">What are cookies?</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your device when you visit a website. 
            While many websites use cookies extensively for tracking and marketing purposes, we have 
            deliberately limited our use of cookies to only what is strictly necessary.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Our Minimal Cookie Usage</h2>
          <p className="mb-4">
            AIdaptics uses cookies in an extremely limited capacity:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Essential cookies only:</strong> We only use cookies that are absolutely necessary for the website to function properly. These cookies do not track your browsing activity for marketing purposes.</li>
            <li><strong>No third-party tracking:</strong> We do not allow third-party services to place tracking cookies on your device through our website.</li>
            <li><strong>No persistent profiling:</strong> We do not build user profiles or track your behavior across different websites.</li>
            <li><strong>No data selling:</strong> We never sell or share your data with third parties for marketing purposes.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Essential Cookies We Use</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold font-syne mb-2">Session Cookies</h3>
            <p>
              These temporary cookies are strictly necessary to enable basic functions of the website. They are usually deleted when you close your browser. They do not collect any personal information and are only used to provide basic website functionality.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold font-syne mb-2">Security Cookies</h3>
            <p>
              These cookies help maintain the security of our website and your account. They are used to authenticate users and prevent fraudulent use of user accounts.
            </p>
          </div>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Cookies We Do NOT Use</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Marketing cookies:</strong> We do not use cookies to track you for advertising purposes.</li>
            <li><strong>Analytics cookies:</strong> We use privacy-focused analytics that do not require cookies or track individual users.</li>
            <li><strong>Social media cookies:</strong> We do not embed third-party social media features that could track your browsing.</li>
            <li><strong>Preference cookies:</strong> We design our site to function without needing to store your preferences in cookies.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Your Control Over Cookies</h2>
          <p className="mb-4">
            While we only use essential cookies, you still have complete control over cookies in your browser:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>You can set your browser to block all cookies, although this may affect the functionality of our website.</li>
            <li>You can delete cookies after each browsing session.</li>
            <li>You can use private/incognito browsing modes.</li>
          </ul>
          <p className="mt-4">
            Browser-specific instructions for managing cookies:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Our Privacy Commitment</h2>
          <p className="mb-4">
            Our strict cookie policy is part of our broader commitment to privacy. We believe in:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Data minimization:</strong> We only collect what we absolutely need.</li>
            <li><strong>Transparency:</strong> We are clear about our practices.</li>
            <li><strong>User control:</strong> You have control over your data.</li>
            <li><strong>Security:</strong> We implement strong security measures to protect your data.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Changes to our cookie policy</h2>
          <p>
            We may update our cookie policy from time to time to reflect changes in technology or regulatory requirements. 
            Any changes will be posted on this page with a new effective date. We will always maintain our commitment to 
            minimal cookie usage and user privacy.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Contact us</h2>
          <p>
            If you have any questions about our strict cookie policy or privacy practices, please contact our privacy team at{' '}
            <a href="mailto:support@aidaptics.com" className="text-blue-600 hover:underline">support@aidaptics.com</a>
          </p>
        </motion.section>
      </motion.div>
      <Footer />
    </>
  );
};

export default CookiePolicyPage;
