"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const finishes = [
  { name: "Titanium Grey", color: "bg-[#4A4643]" },
  { name: "Warm Champagne", color: "bg-[#BCA48C]" },
  { name: "Forest Green", color: "bg-[#1B3022]" },
  { name: "Matte Black", color: "bg-[#1A1A1A]" },
  { name: "Sandstone Beige", color: "bg-[#D9C4B1]" },
  { name: "Navy Blue", color: "bg-[#1A2533]" },
];

const VoteSection = () => {
  const [selectedFinish, setSelectedFinish] = React.useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Content: Swatches */}
          <div className="flex-1 w-full">
            <div className="mb-8">
              <h2 className="text-[20px] md:text-[24px] font-sans font-bold text-brand-copper uppercase tracking-wider mb-2">
                Vote for your favourite finish
              </h2>
              <p className="text-text-secondary text-[16px]">
                Help us decide what launches first!
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
              {finishes.map((finish, index) => (
                <motion.div
                  key={finish.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedFinish(finish.name)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div 
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full ${finish.color} mb-3 overflow-hidden border transition-all duration-300 ${
                      selectedFinish === finish.name 
                        ? "border-brand-copper ring-4 ring-brand-copper/10 scale-110 shadow-lg" 
                        : "border-divider shadow-sm group-hover:shadow-md"
                    }`}
                  >
                    {/* The signature copper line */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-brand-copper/60" />
                    
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />

                    {/* Radio indicator overlay */}
                    <motion.div 
                      initial={false}
                      animate={{ opacity: selectedFinish === finish.name ? 1 : 0, scale: selectedFinish === finish.name ? 1 : 0.5 }}
                      className="absolute inset-0 flex items-center justify-center bg-brand-forest/20 backdrop-blur-[1px]"
                    >
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <div className="w-3 h-3 rounded-full bg-brand-copper" />
                      </div>
                    </motion.div>
                  </div>
                  <span className={`text-[11px] md:text-[12px] font-semibold text-center leading-tight transition-colors ${
                    selectedFinish === finish.name ? "text-brand-forest font-bold" : "text-text-secondary"
                  }`}>
                    {finish.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Content: CTA */}
          <div className="flex items-center gap-8 lg:pl-8 lg:border-l border-divider w-full lg:w-auto justify-center lg:justify-start">
            <div className="flex flex-col items-center gap-4">
              <motion.button
                whileHover={selectedFinish ? { scale: 1.02 } : {}}
                whileTap={selectedFinish ? { scale: 0.98 } : {}}
                disabled={!selectedFinish}
                className={`px-8 py-4 rounded-full flex items-center gap-3 uppercase text-[14px] font-bold tracking-widest transition-all duration-300 ${
                  selectedFinish 
                    ? "bg-brand-forest text-white shadow-lg hover:bg-brand-forest-hover cursor-pointer" 
                    : "bg-divider text-text-muted cursor-not-allowed"
                }`}
              >
                Cast Your Vote
                <ArrowRight size={18} />
              </motion.button>
              <p className="text-text-muted text-[13px]">
                {selectedFinish ? `Selected: ${selectedFinish}` : "Please select a finish to vote"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoteSection;
