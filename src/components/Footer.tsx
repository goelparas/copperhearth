"use client";

import React from "react";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-forest text-[#E9DED1] border-t border-white/5 py-12 px-6 flex flex-col items-center">
      <div className="container mx-auto max-w-[800px] flex items-center justify-center">
        {/* Main Brand & Contact Block */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Left Block: Monogram Logo, Brand Label, and Social Link */}
          <div className="flex flex-col items-center select-none">
            {/* Logo Monogram */}
            <div className="font-serif text-3xl md:text-5xl text-white tracking-wide leading-none">
              CH
            </div>
            {/* Subtitle */}
            <div className="text-[8px] md:text-[10px] uppercase tracking-[0.25em] text-white/50 font-sans mt-2 font-medium">
              COPPER HEARTH
            </div>
            {/* Instagram Icon */}
            <a
              href="https://instagram.com/copper_Hearth"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-white/70 hover:text-brand-copper transition-colors duration-300 animate-none"
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-20 bg-white/20 self-stretch" />

          {/* Right Block: Email Contact Link */}
          <div className="flex items-center">
            <a
              href="mailto:hearthcopper@gmail.com"
              className="font-sans text-xs md:text-sm uppercase tracking-widest text-[#E9DED1]/80 hover:text-brand-copper transition-colors duration-300 font-medium"
            >
              hearthcopper@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Subdued Copyright Disclaimer */}
      <div className="mt-12 text-center text-[9px] text-[#E9DED1]/30 uppercase tracking-[0.2em] select-none">
        &copy; {new Date().getFullYear()} Copper Hearth. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
