"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[900px] pt-40 pb-20 px-6 flex flex-col items-center bg-background overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-[1280px]">
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 order-2 lg:order-1 max-w-[520px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="small-label text-brand-copper mb-6"
          >
            PRELAUNCH OFFER
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            Healthy hydration made <span className="text-brand-copper italic font-normal">effortless.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="subheading mb-12"
          >
            Join the prelaunch list and get 10% off when we launch.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full"
          >
            <button className="btn-primary w-full sm:w-auto">
              <span>Join Prelaunch List</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
            <button className="flex items-center justify-center border border-brand-forest text-brand-forest rounded-full font-sans font-semibold uppercase transition-all duration-300 px-8 h-[54px] text-[14px] tracking-[0.5px] hover:bg-brand-forest/5 w-full sm:w-auto">
              Reserve Your Spot
            </button>
          </motion.div>
          
          <div className="mt-6 flex items-center space-x-2 text-text-muted text-[11px] uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-copper" />
            <span>Get extra 10% off at launch</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative order-1 lg:order-2 w-full flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[600px] h-[420px] lg:h-[760px] rounded-[28px] overflow-hidden shadow-2xl"
          >
            <Image
              src="/generate_the_image_where_the_202605161500.jpeg"
              alt="Copper Heritage Products"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/10 to-transparent pointer-events-none" />
          </motion.div>
          
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-6 right-10 lg:right-0 bg-white p-6 rounded-2xl shadow-xl hidden sm:block z-20"
          >
            <p className="small-label text-brand-copper mb-1">
              Handcrafted
            </p>
            <p className="text-xl font-serif text-foreground">100% Pure Copper</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
