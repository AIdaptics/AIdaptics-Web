"use client";
import React, { useState } from 'react';
import NavbarComponent from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Send, 
  Linkedin, 
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SupportPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    service: '',
    message: '',
    contactMethod: 'email',
    contactDetails: '',
  });

  // Form status
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // Prepare the data for Discord webhook
      const webhookData = {
        embeds: [
          {
            title: "New Support Request",
            color: 3447003, // Blue color
            fields: [
              {
                name: "Name",
                value: formData.name,
                inline: true
              },
              {
                name: "Email",
                value: formData.email,
                inline: true
              },
              {
                name: "Order ID",
                value: formData.orderId || "N/A",
                inline: true
              },
              {
                name: "Service",
                value: formData.service,
                inline: true
              },
              {
                name: "Contact Method",
                value: formData.contactMethod,
                inline: true
              },
              {
                name: "Contact Details",
                value: formData.contactDetails,
                inline: true
              },
              {
                name: "Message",
                value: formData.message
              }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      };

      // Send the data to your API route
      const response = await fetch('/api/SendInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit support request');
      }
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        orderId: '',
        service: '',
        message: '',
        contactMethod: 'email',
        contactDetails: '',
      });
      
      setFormStatus('success');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch {
      setFormStatus('error');
      setErrorMessage('There was an error submitting your request. Please try again later.');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  // Get contact method icon
  const getContactMethodIcon = () => {
    switch (formData.contactMethod) {
      case 'email':
        return <Mail className="h-5 w-5 text-gray-400" />;
      case 'whatsapp':
        return <MessageSquare className="h-5 w-5 text-gray-400" />;
      case 'phone':
        return <Phone className="h-5 w-5 text-gray-400" />;
      case 'discord':
        return <DiscordLogoIcon className="h-5 w-5 text-gray-400" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-gray-400" />;
      default:
        return <Mail className="h-5 w-5 text-gray-400" />;
    }
  };

  // Get contact method placeholder
  const getContactMethodPlaceholder = () => {
    switch (formData.contactMethod) {
      case 'email':
        return 'your@email.com';
      case 'whatsapp':
        return '+1 (123) 456-7890';
      case 'phone':
        return '+1 (123) 456-7890';
      case 'discord':
        return 'username#1234';
      case 'linkedin':
        return 'linkedin.com/in/yourprofile';
      default:
        return 'Contact details';
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
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-3xl font-bold font-syne mb-4">Support Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Need help with our services? Fill out the form below and our support team will get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div 
          className="bg-black text-white rounded-2xl shadow-xl p-8 border border-gray-800 relative overflow-hidden"
          variants={itemVariants}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          {formStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 relative z-10">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold font-syne mb-2">Request Submitted!</h2>
              <p className="text-center text-gray-300 mb-6">
                Thank you for reaching out. Our team will review your request and get back to you shortly.
              </p>
              <button
                onClick={() => setFormStatus('idle')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Order ID and Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="orderId" className="block text-sm font-medium text-gray-300">
                    Order ID (if applicable)
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    placeholder="e.g. AID-12345"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300">
                    Service <span className="text-red-500">*</span>
                  </label>
                  <Select 
                    value={formData.service} 
                    onValueChange={(value) => handleSelectChange('service', value)}
                    required
                  >
                    <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ai-automation">AI Automation</SelectItem>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="technical-support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-2">
                <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-300">
                  Preferred Contact Method <span className="text-red-500">*</span>
                </label>
                <Select 
                  value={formData.contactMethod} 
                  onValueChange={(value) => handleSelectChange('contactMethod', value)}
                  required
                >
                  <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="discord">Discord</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Details */}
              <div className="space-y-2">
                <label htmlFor="contactDetails" className="block text-sm font-medium text-gray-300">
                  Contact Details <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {getContactMethodIcon()}
                  </div>
                  <input
                    type="text"
                    id="contactDetails"
                    name="contactDetails"
                    value={formData.contactDetails}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                    placeholder={getContactMethodPlaceholder()}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                  placeholder="Please describe your issue or question in detail..."
                ></textarea>
              </div>

              {/* Error Message */}
              {formStatus === 'error' && (
                <div className="flex items-center p-4 bg-red-900/50 rounded-lg border border-red-700">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <p className="text-sm text-red-300">{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors flex items-center ${
                    formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Request <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};
export default SupportPage;