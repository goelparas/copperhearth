"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import hero from "../../public/hero.png";
import CountdownTimer from "./CountdownTimer";

const Hero = () => {
  const handleScrollToSignup = () => {
    const el = document.getElementById("signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative gap-8 h-[90dvh] pt-28 bg-linear-to-t from-brand-copper/20 to-brand-copper/10 flex flex-col items-center justify-start bg-background overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center max-w-[1280px]">
        {/* Text Content */}
        <div className="flex flex-col h-[50dvh] items-left lg:items-start px-6 text-center lg:text-left z-10 max-w-[520px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-left"
          >
            The modern{" "}
            <span className="text-brand-copper italic font-normal">Indian</span>
            <br />
            water ritual.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleScrollToSignup}
              className="bg-brand-forest text-brand-copper-soft hover:bg-brand-forest-hover font-serif text-sm sm:text-base font-bold uppercase tracking-widest rounded-full flex items-center justify-center h-[54px] px-8 transition-all duration-300 shadow-md shadow-brand-forest/15 hover:shadow-xl hover:shadow-brand-forest/25 text-nowrap w-min sm:w-auto cursor-pointer"
            >
              <span>Join the First Collection</span>
              <ArrowRight size={16} className="ml-2.5 text-brand-copper" />
            </motion.button>
          </motion.div>
          {/* Caption */}
          <div className="flex items-center space-x-2 mt-4 text-brand-copper group-hover:text-brand-copper-dark transition-colors duration-300">
            <Flame size={15} className="animate-pulse fill-current" />
            <span className="text-[11px] sm:text-xs font-sans tracking-wide text-brand-forest font-semibold underline decoration-brand-copper/30 underline-offset-4">
              Offer ends soon. Don&apos;t miss out.
            </span>
          </div>

          {/* Interactive Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 md:mt-12 w-full flex justify-center lg:justify-start"
          >
            <CountdownTimer />
          </motion.div>
        </div>

        {/* Product Image Area */}
        <div className="absolute h-[45dvh] bottom-0 md:relative md:bottom-auto w-full flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={hero}
              alt="Copper Hearth Products"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
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
