"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function NavbarComponent() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Array of mobile menu items (can be different if needed)
  const mobileMenuItems = [
    { href: "/", text: "Home" },
    { href: "/#about", text: "About" },
    { href: "/#services", text: "Services" },
    { href: "/#testimonials", text: "Testimonials" },
    { href: "/#faqs", text: "Faqs" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-screen z-50 top-0 left-0"
    >
      <nav
        className={`max-w-screen-xl mx-auto flex justify-between items-center px-4 py-4 transition-all duration-300 ease-in-out
          ${hasScrolled ? "after:opacity-100" : "md:after:opacity-0"} 
          after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white/10 
          after:transition-opacity after:duration-300 after:ease-in-out`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-full -z-20 transition-all duration-300 ease-in-out
            ${
              hasScrolled
                ? "opacity-100 backdrop-blur-md bg-black/80"
                : "md:opacity-0 md:blur-none md:bg-transparent"
            }
            before:absolute before:w-full before:h-full before:bg-gradient-to-b before:from-black/[0.08] before:to-transparent`}
        ></div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center">
            <Image
              width={39}
              height={35}
              src="/corrupted_pixl.gif"
              alt="AIdaptics Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-syne font-bold text-white ml-2">
              AIdaptics
            </span>
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-0 md:hidden text-white" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full h-[100dvh] border-none bg-black p-0"
          >
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <span className="text-xl font-syne font-bold text-white">
                  AIdaptics
                </span>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                  <SheetTrigger asChild>
                    <Link href="/get-started">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full bg-black text-white hover:bg-black/90"
                      >
                        Get Started <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </SheetTrigger>
                  <nav className="border-t border-white/10">
                    {mobileMenuItems.map((item) => (
                      <Link
                        href={item.href}
                        className="flex w-full items-center justify-between px-6 py-4 text-white hover:text-white/80 border-b border-white/10 transition-colors font-syne font-bold"
                        key={item.href}
                      >
                        <SheetTrigger>{item.text}</SheetTrigger>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:flex md:space-x-8 text-white font-syne font-bold"
        >
          {mobileMenuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-white/80 transition">
                {item.text}
              </Link>
            </li>
          ))}
        </motion.ul>

        {/* Desktop Menu Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden md:flex items-center gap-4"
        >
          <Link href="/get-started">
            <Button variant="default" className="rounded-full">
              Get Started <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </nav>
    </motion.div>
  );
}
