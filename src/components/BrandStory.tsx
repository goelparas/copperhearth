"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BrandStory = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/hero.png" // Reusing hero image for brand story context
              alt="Our Craftsmanship"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-dark/20"></div>
            <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <p className="text-white italic text-lg leading-relaxed">
                "We believe that the objects we use daily should be as beautiful as they are beneficial."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-accent uppercase tracking-[0.3em] text-xs font-semibold mb-6">Our Legacy</p>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8 leading-tight">
              Crafting for Heritage & Modern Wellness
            </h2>
            <div className="space-y-6 text-brand-dark/70 leading-relaxed text-lg">
              <p>
                Copper Hearth was born out of a desire to rediscover the ancient wisdom of copper, 
                refined for the modern world. Our journey began in the workshops of master artisans, 
                where centuries-old techniques are still whispered from teacher to apprentice.
              </p>
              <p>
                Every bottle we create is a testament to this legacy. Hand-forged, inspected by eye, 
                and polished by hand. We don't just make bottles; we create companions for your 
                wellness journey that are designed to last a lifetime.
              </p>
              <div className="pt-8 border-t border-brand-muted">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-serif text-2xl text-brand-dark mb-2">100%</h4>
                    <p className="text-xs uppercase tracking-widest text-brand-accent">Recyclable</p>
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-brand-dark mb-2">Lifetime</h4>
                    <p className="text-xs uppercase tracking-widest text-brand-accent">Warranty</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
