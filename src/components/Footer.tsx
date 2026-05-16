"use client";

import React from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import InstagramIcon from "./Icons/InstagramIcon";

const Footer = () => {
  return (
    <footer className="bg-brand-forest text-[#E9DED1] min-h-[160px] lg:min-h-[220px] px-6 py-12 border-t border-white/5 flex items-center">
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Logo */}
          <div className="relative w-40 h-12">
            <Image
              src="/logo.png"
              alt="Copper Heritage"
              fill
              className="object-contain brightness-0 invert opacity-90"
            />
          </div>
          
          {/* Info */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <a 
              href="mailto:hello@copperheritage.in" 
              className="group flex items-center space-x-3 text-[#E9DED1]/80 hover:text-brand-copper transition-colors"
            >
              <Mail size={18} strokeWidth={1.5} />
              <span className="text-[13px] uppercase tracking-widest font-medium">hello@copperheritage.in</span>
            </a>
            
            <a 
              href="https://instagram.com" 
              className="group text-[#E9DED1]/80 hover:text-brand-copper transition-colors"
            >
              <InstagramIcon size={22} />
            </a>
          </div>

          {/* Bottom Text */}
          <div className="text-[10px] text-[#E9DED1]/40 uppercase tracking-[0.2em]">
            &copy; 2024 Copper Heritage
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
