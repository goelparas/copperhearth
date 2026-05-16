"use client";

import React from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const comparisonData = {
  copper: [
    "Stores water in pure copper",
    "Supports natural wellness",
    "Aids digestion & immunity",
    "Rich in antioxidants",
    "Helps maintain healthy skin",
    "Sustainable & long-lasting",
  ],
  generic: [
    "Stored in plastic or steel",
    "No natural health benefits",
    "May affect digestion",
    "No antioxidant value",
    "No impact on skin health",
    "Shorter life, more waste",
  ],
};

const ComparisonSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="text-center mb-16 md:mb-20">
          <p className="small-label text-brand-copper mb-4">
            THE DIFFERENCE IS IN THE WATER YOU DRINK
          </p>
          <h2 className="text-foreground">
            Copper Heritage vs Without Copper
          </h2>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Copper Heritage Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#F8F2EB] p-8 md:p-12 rounded-[24px] border border-[#E5D9CB] relative z-10 shadow-sm"
          >
            <h3 className="small-label text-brand-copper mb-8">
              WITH COPPER HERITAGE
            </h3>
            <ul className="space-y-4 mb-12">
              {comparisonData.copper.map((item) => (
                <li key={item} className="flex items-center space-x-3 text-text-secondary">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-copper/10 flex items-center justify-center">
                    <Check size={12} className="text-brand-copper" />
                  </div>
                  <span className="text-[15px] md:text-[16px]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/comparison-copper.png"
                alt="Copper Heritage Product"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* VS Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center w-[72px] h-[72px] bg-brand-forest text-white rounded-full border-4 border-background text-xl font-serif italic shadow-xl">
            vs
          </div>
          <div className="flex lg:hidden items-center justify-center py-6">
            <div className="w-12 h-12 bg-brand-forest text-white rounded-full flex items-center justify-center font-serif italic text-lg shadow-lg">vs</div>
          </div>

          {/* Generic Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-soft/50 p-8 md:p-12 rounded-[24px] border border-card-border"
          >
            <h3 className="small-label text-text-muted mb-8">
              WITHOUT COPPER
            </h3>
            <ul className="space-y-4 mb-12">
              {comparisonData.generic.map((item) => (
                <li key={item} className="flex items-center space-x-3 text-text-muted">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-text-muted/10 flex items-center justify-center">
                    <X size={12} className="text-text-muted" />
                  </div>
                  <span className="text-[15px] md:text-[16px]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-bg-soft flex items-center justify-center border border-divider">
               <span className="text-text-muted/20 text-[10px] uppercase tracking-widest">Plain Vessel Placeholder</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
