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
    <section className="relative h-[90lvh] overflow-hidden bg-background bg-linear-to-t from-brand-copper/20 to-brand-copper/10 pt-28 lg:h-[calc(100svh-2.625rem)] lg:min-h-168 lg:pt-36">
      <CertificationRibbon />
      <div className="container relative z-10 mx-auto md:mx-0 grid h-full max-w-full grid-cols-1 items-start px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        {/* Text Content */}
        <div className="z-10 flex h-[50lvh] md:pl-24 max-w-130 flex-col items-left text-center lg:h-auto lg:max-w-xl lg:items-start lg:pb-20 lg:pt-4 lg:text-left xl:max-w-156">
          <motion.h1
            initial={{ opacity: 0, y: "1.20rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-left lg:mb-6 lg:text-[4.75rem] lg:leading-[0.98] xl:text-[5.35rem]"
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
            className="my-3 text-left font-sans text-sm font-semibold lg:mb-8 lg:mt-0 lg:text-lg lg:font-medium lg:leading-relaxed xl:text-xl"
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
            className="flex w-full flex-col justify-center space-y-4 sm:flex-row sm:justify-start sm:space-x-4 sm:space-y-0 lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: "-0.125rem" }}
              whileTap={{ scale: 0.96 }}
              onClick={handleScrollToSignup}
              className="flex w-min cursor-pointer items-center justify-center text-nowrap rounded-full bg-brand-forest px-4 py-4 font-serif text-xs font-bold uppercase tracking-widest text-brand-copper-soft shadow-md shadow-brand-forest/15 transition-all duration-300 hover:bg-brand-forest-hover hover:shadow-xl hover:shadow-brand-forest/25 sm:w-auto sm:px-8 sm:text-base lg:px-10 lg:py-5 lg:text-sm"
            >
              <span>Join the First Collection</span>
              <ArrowRight size="1rem" className="ml-2.5 text-brand-copper" />
            </motion.button>
          </motion.div>
          {/* Caption */}
          <div className="mt-4 flex items-center space-x-2 text-brand-copper transition-colors duration-300 group-hover:text-brand-copper-dark lg:mt-7">
            <Flame size="0.9375rem" className="animate-pulse fill-current" />
            <JoinedCounter />
          </div>

        </div>

        {/* Product Image Area */}
        <div className="absolute bottom-0 right-0 h-[40lvh] w-full md:w-1/2 md:relative md:bottom-auto lg:absolute lg:inset-y-0 lg:right-0 lg:h-full ">
          <motion.div
            initial={{ opacity: 0, x: "1.25rem" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={hero}
              alt="Copper Hearth Products"
              fill
              className="z-20 object-cover object-center"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
