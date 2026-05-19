"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import hero from "../../public/hero.png";
import JoinedCounter from "./JoinedCounter";
import CertificationRibbon from "./CertificationRibbon";

const Hero = () => {
  const handleScrollToSignup = () => {
    const el = document.getElementById("signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative gap-8 h-[90lvh] pt-28 bg-linear-to-t from-brand-copper/20 to-brand-copper/10 flex flex-col items-center justify-start bg-background overflow-hidden">
      <CertificationRibbon />
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center max-w-[80rem]">
        {/* Text Content */}
        <div className="flex flex-col  h-[50lvh] items-left lg:items-start px-4 text-center lg:text-left z-10 max-w-[32.5rem]">
          <motion.h1
            initial={{ opacity: 0, y: "1.20rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-left"
          >
            The modern <br />
            <span className="text-brand-copper italic font-normal">Indian</span>
            <br />
            water ritual.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: "0.9375rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="my-3 text-sm font-semibold font-sans text-left"
          >
            The water you drink matters more than
            <br />
            the supplements you take.
          </motion.p>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: "1.25rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center sm:justify-start lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: "-0.125rem" }}
              whileTap={{ scale: 0.96 }}
              onClick={handleScrollToSignup}
              className="bg-brand-forest text-brand-copper-soft hover:bg-brand-forest-hover font-serif text-xs sm:text-base font-bold uppercase tracking-widest rounded-full flex items-center justify-center py-4 px-4 sm:px-8 transition-all duration-300 shadow-md shadow-brand-forest/15 hover:shadow-xl hover:shadow-brand-forest/25 text-nowrap w-min sm:w-auto cursor-pointer"
            >
              <span>Join the First Collection</span>
              <ArrowRight size="1rem" className="ml-2.5 text-brand-copper" />
            </motion.button>
          </motion.div>
          {/* Caption */}
          <div className="flex items-center space-x-2 mt-4 text-brand-copper group-hover:text-brand-copper-dark transition-colors duration-300">
            <Flame size="0.9375rem" className="animate-pulse fill-current" />
            <JoinedCounter />
          </div>

        </div>

        {/* Product Image Area */}
        <div className="absolute h-[40lvh] bottom-0 md:relative md:bottom-auto w-full flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: "1.25rem" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={hero}
              alt="Copper Hearth Products"
              fill
              className="object-cover z-20"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
