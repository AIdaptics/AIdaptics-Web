"use client";
import React from 'react';
import NavbarComponent from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

const TermsOfServicePage = () => {
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
          Terms of Service
        </motion.h1>
        
        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Agreement to Terms</h2>
          <p className="mb-4">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the AIdaptics website and services. 
            By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these 
            Terms, you may not access or use our services.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Use of Services</h2>
          <p className="mb-4">
            AIdaptics provides tools and services for AI development and deployment. Our services are subject to the following conditions:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>You must be at least 16 years old to use our services.</li>
            <li>You must provide accurate and complete information when creating an Order.</li>
            <li>You are responsible for maintaining the security of your Order credentials.</li>
            <li>You may not use our services for any illegal or unauthorized purpose.</li>
            <li>You may not violate any laws in your jurisdiction while using our services.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Intellectual Property</h2>
          <p className="mb-4">
            Our services and content are protected by copyright, trademark, and other intellectual property laws:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Our Content:</strong> All content provided by AIdaptics, including but not limited to text, graphics, logos, icons, images, audio, video, and software, is the property of AIdaptics or its licensors and is protected by intellectual property laws.</li>
            <li><strong>Your Content:</strong> You retain ownership of any content you submit, post, or display on or through our services. By submitting content, you grant AIdaptics a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such content for the purpose of providing and improving our services.</li>
            <li><strong>Feedback:</strong> If you provide feedback or suggestions about our services, we may use this feedback without any obligation to you.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">User Conduct</h2>
          <p className="mb-4">
            When using our services, you agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe upon the rights of others, including intellectual property rights.</li>
            <li>Harass, abuse, or harm another person or entity.</li>
            <li>Upload or transmit viruses, malware, or other malicious code.</li>
            <li>Interfere with or disrupt the integrity or performance of our services.</li>
            <li>Attempt to gain unauthorized access to our systems or user accounts.</li>
            <li>Collect or harvest user data without permission.</li>
            <li>Use our services in any manner that could disable, overburden, damage, or impair our services.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>AIdaptics and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill.</li>
            <li>In no event shall our aggregate liability for all claims related to the services exceed the greater of $100 or the amount you paid to AIdaptics for the services in the past 12 months.</li>
            <li>These limitations will apply even if we have been advised of the possibility of such damages.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Disclaimer of Warranties</h2>
          <p className="mb-4">
            Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including, but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</li>
            <li>That our services will be uninterrupted, secure, or error-free.</li>
            <li>That any errors or defects will be corrected.</li>
            <li>That our services or the servers that make them available are free of viruses or other harmful components.</li>
          </ul>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.
          </p>
          <p className="mb-4">
            Upon termination, your right to use our services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including without limitation ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p className="mb-4">
            By continuing to access or use our services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you must stop using our services.
          </p>
        </motion.section>

        <motion.section className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed and construed in accordance with the laws applicable in your jurisdiction, without regard to its conflict of law provisions.
          </p>
          <p className="mb-4">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-bold font-syne mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:support@aidaptics.com" className="text-blue-600 hover:underline">support@aidaptics.com</a>
          </p>
        </motion.section>
      </motion.div>
      <Footer />
    </>
  );
};

export default TermsOfServicePage;