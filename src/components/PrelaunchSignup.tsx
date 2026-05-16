"use client";

import React, { useState } from "react";
import { Gift } from "lucide-react";
import { motion } from "framer-motion";

const PrelaunchSignup = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-6">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-forest rounded-[48px] md:rounded-[64px] p-8 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12 border border-white/5"
        >
          {/* Left Content: Icon & Messaging */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center text-brand-copper shrink-0 shadow-[0_0_50px_rgba(184,115,51,0.05)]">
              <Gift size={32} />
            </div>
            <div className="max-w-md">
              <p className="text-white/30 text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] mb-3 font-bold">
                Be the first to own it.
              </p>
              <h2 className="text-2xl md:text-5xl font-serif text-white leading-[1.2] md:leading-tight">
                Join early & get{" "}
                <span className="text-brand-copper italic font-medium">
                  10% off
                </span>{" "}
                at launch.
              </h2>
            </div>
          </div>

          {/* Right Content: Signup Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full lg:max-w-md flex flex-col sm:flex-row items-stretch gap-0 overflow-hidden rounded-[24px] md:rounded-[32px] border border-white/10 shadow-2xl bg-white/5 focus-within:border-brand-copper/40 transition-all"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-6 py-4 md:py-6 text-white text-[14px] placeholder:text-white/20 focus:outline-none transition-all"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-brand-copper hover:bg-brand-copper/90 text-white px-8 py-4 md:py-6 text-[10px] md:text-[13px] font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap shrink-0">
              Join the Collection
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default PrelaunchSignup;
