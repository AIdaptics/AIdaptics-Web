"use client";
import React from 'react';
import NavbarComponent from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
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
        className="max-w-4xl mx-auto px-6 py-12 mt-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl font-bold font-syne mb-8"
          variants={itemVariants}
        >
          Privacy Policy
        </motion.h1>
        
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Our Commitment to Privacy</h2>
          <p className="mb-4">
            At AIdaptics, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you visit our website or use our services. 
            We respect your privacy and are committed to protecting your personal data.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect information in a minimal and transparent manner:
          </p>
          <div className="mb-6">
            <h3 className="text-lg font-bold font-syne mb-2">Personal Information</h3>
            <p>
              We may collect personal identification information such as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name and email address when you contact us</li>
              <li>Account information if you create an account</li>
              <li>Information you provide when using our services</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold font-syne mb-2">Usage Data</h3>
            <p>
              We may collect non-personal identification information about how you interact with our website, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Access times and dates</li>
              <li>Device information</li>
            </ul>
          </div>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect for specific, limited purposes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>To provide and maintain our services:</strong> Including processing transactions and managing your account.</li>
            <li><strong>To improve our website and services:</strong> We analyze usage data to enhance user experience.</li>
            <li><strong>To communicate with you:</strong> Responding to inquiries, providing support, and sending important updates.</li>
            <li><strong>To protect our services:</strong> Preventing fraud and ensuring the security of our platform.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Data Protection</h2>
          <p className="mb-4">
            We implement robust security measures to protect your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Encryption:</strong> We use industry-standard encryption to protect sensitive data.</li>
            <li><strong>Secure infrastructure:</strong> Our systems are regularly updated and monitored for security vulnerabilities.</li>
            <li><strong>Access controls:</strong> We limit access to personal information to authorized personnel only.</li>
            <li><strong>Regular audits:</strong> We conduct security assessments to ensure data protection.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Information Sharing</h2>
          <p className="mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share information in the following limited circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Service providers:</strong> With trusted third parties who assist us in operating our website and providing services.</li>
            <li><strong>Legal requirements:</strong> When required by law or to protect our rights.</li>
            <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            <li><strong>With your consent:</strong> When you have explicitly agreed to the sharing of your information.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Your Privacy Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Access:</strong> The right to request copies of your personal information.</li>
            <li><strong>Rectification:</strong> The right to request correction of information you believe is inaccurate.</li>
            <li><strong>Erasure:</strong> The right to request deletion of your personal information.</li>
            <li><strong>Restriction:</strong> The right to request restriction of processing of your personal information.</li>
            <li><strong>Data portability:</strong> The right to request transfer of your information to another organization.</li>
            <li><strong>Objection:</strong> The right to object to processing of your personal information.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information provided at the end of this policy.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Children&apos;s Privacy</h2>
          <p className="mb-4">
            Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take steps to remove that information.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date. We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@aidaptics.com" className="text-blue-600 hover:underline">support@aidaptics.com</a>
          </p>
        </motion.section>
      </motion.div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;