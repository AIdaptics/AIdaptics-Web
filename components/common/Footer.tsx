import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { DiscordLogoIcon } from '@radix-ui/react-icons';

const Footer = () => {

  const footerLinks = {
    AIdaptics: [
      { name: 'Careers', href: '#' },
      { name: 'Support', href: '/Support' },
      { name: 'Case Studies', href: '/case-studies' },
    ],
    Legal: [
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/Terms-of-Service' },
    ],
  };

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://x.com/AIdaptics', 
      icon: <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 hover:bg-black/20">
              <Twitter size={16} className="text-white" />
            </div>
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/AIdaptics', 
      icon: <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 hover:bg-black/20">
              <Github size={16} className="text-white" />
            </div>
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/company/AIdaptics/', 
      icon: <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 hover:bg-black/20">
              <Linkedin size={16} className="text-white" />
            </div>
    },
    { 
      name: 'Discord', 
      href: 'https://discord.gg/CceTUTqBsG', 
      icon: <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 hover:bg-black/20">
              <DiscordLogoIcon width={16} height={16} className="text-white" />
            </div>
    },
  ];


  return (
    <footer className="bg-black text-white py-16 px-6 font-syne font-bold transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-16">
        {/* Header Section */}
     

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 lg:flex-1">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-white font-syne font-bold">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors font-syne"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
           <div className="mb-16 lg:mb-0 lg:w-1/3 space-y-6">
           
          <div className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-4">
            <Mail size={16} />
            <a href="mailto:hi@aidaptics.com" className="text-sm">hi@aidaptics.com</a>
          </div>
          <div className="flex space-x-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target='_blank'
                className="transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="inline-flex items-center space-x-2 bg-black/5 rounded-full px-4 py-2 w-fit">
            <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
            <span className="text-sm text-white font-syne font-bold">India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;