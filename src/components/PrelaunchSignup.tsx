"use client";

import React, { useState } from "react";
import { Check, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PrelaunchSignup = () => {
  const [email, setEmail] = useState("");

  const benefits = [
    "Get extra 10% off at launch",
    "Early access to new products",
    "Exclusive prelaunch updates",
    "Limited prelaunch rewards",
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#0F2B25] to-[#12342D] rounded-[32px] p-8 md:p-20 text-[#F7F2EC] shadow-2xl overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-copper/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] -ml-24 -mb-24" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Benefits */}
            <div>
              <h2 className="text-[34px] md:text-[52px] font-serif mb-10 leading-tight text-[#F7F2EC]">
                Be the first to experience <br /> better hydration.
              </h2>
              <ul className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-copper/20 flex items-center justify-center">
                      <Check className="text-brand-copper" size={14} />
                    </div>
                    <span className="text-lg font-light text-[#F7F2EC]/80">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-[24px] border border-white/10">
              <p className="small-label text-brand-copper mb-6 text-center lg:text-left">
                JOIN THE PRELAUNCH LIST
              </p>
              <h3 className="text-2xl md:text-3xl font-serif mb-8 text-center lg:text-left">
                Get 10% off when we launch.
              </h3>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-white/5 border border-white/12 rounded-[16px] h-[56px] px-6 text-[#F7F2EC] placeholder:text-[#F7F2EC]/30 focus:outline-none focus:border-brand-copper transition-colors"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button className="w-full bg-brand-copper text-white h-[56px] rounded-[16px] text-[14px] uppercase tracking-[0.3em] font-bold hover:bg-brand-copper/90 transition-all transform active:scale-[0.98] shadow-lg flex items-center justify-center space-x-3">
                  <span>JOIN NOW</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center space-x-2 text-[#F7F2EC]/30 text-[11px] uppercase tracking-widest">
                <Shield size={12} />
                <span>We respect your privacy. No spam, ever.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrelaunchSignup;
