"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FeatureSection = () => {
  return (
    <section className="relative w-full h-[90lvh] min-h-[43.75rem] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/feature.png"
          alt="Copper Hearth Collection"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full container mx-auto px-6 flex flex-col justify-start pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          {/* Logo */}
          <div className="mb-6 md:mb-16">
            <Image
              src="/logo.png"
              alt="GH Logo"
              width={70}
              height={70}
              className="brightness-0 invert opacity-90"
            />
          </div>

          <p className="text-white/80 uppercase tracking-[0.3em] text-[0.75rem] font-bold mb-6">
            Explore the
          </p>

          <h1 className="text-white text-6xl md:text-8xl font-serif mb-8 leading-[0.9]">
            First <br />
            <span className="italic font-normal">Collection</span>
          </h1>

          <div className="w-16 h-0.5 bg-white/40 mb-8" />

          <p className="text-white/90 text-lg md:text-xl font-sans font-light max-w-xs leading-relaxed">
            Modern silhouettes. <br />
            Rooted in tradition.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
