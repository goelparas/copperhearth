"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero from "../../public/hero.png";
const Hero = () => {
  return (
    <section className="relative gap-8 h-[90dvh] pt-32   bg-linear-to-t from-brand-copper/20 to-brand-copper/10 flex flex-col items-center justify-start bg-background overflow-hidden">
      <div className="container mx-auto grid grid-cols-1  lg:grid-cols-2  lg:gap-24 items-center max-w-[1280px]">
        {/* Text Content */}
        <div className="flex flex-col h-[50dvh] items-left lg:items-start px-6 text-center lg:text-left z-10  max-w-[520px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-left"
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
            className=" my-3 text-sm  font-normal text-left "
          >
            Crafted from pure copper for those who value
            <br />
            timeless materials.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full"
          >
            <button className="btn-primary w-min text-nowrap   sm:w-auto">
              <span>Join the First Collection</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          </motion.div>
        </div>
        <div className="absolute h-[40dvh]    bottom-0 md:relative md:bottom-auto w-full flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <motion.text
              className="w-full h-2 text-sm font-semibold pl-6  absolute z-10 top-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontWeight: "500" }}
            >
              Get Extra 10% on Launch
            </motion.text>
            <Image
              src={hero}
              alt="Copper Heritage Products"
              fill
              className="object-cover z-20 "
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
