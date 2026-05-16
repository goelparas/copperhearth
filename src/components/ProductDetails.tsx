"use client";

import React from "react";
import { motion } from "framer-motion";

const details = [
  {
    title: "PURE COPPER INSIDE",
    desc: "Ayurvedic benefits in every sip.",
    color: "bg-[#D9A67C]/20"
  },
  {
    title: "LEAK-PROOF LID",
    desc: "Secure. Spill-proof. Travel with confidence.",
    color: "bg-[#B87333]/20"
  },
  {
    title: "ERGONOMIC HANDLE",
    desc: "Comfortable grip. Perfect balance.",
    color: "bg-[#8B4513]/20"
  },
  {
    title: "ANTI-SLIP BASE",
    desc: "Stable. Silent. Scratch-safe.",
    color: "bg-[#A0522D]/20"
  },
  {
    title: "WIDE MOUTH",
    desc: "Easy to clean. Easy to fill.",
    color: "bg-[#CD853F]/20"
  },
  {
    title: "PREMIUM FINISH",
    desc: "Durable. Timeless. Made to last.",
    color: "bg-[#DEB887]/20"
  },
];

const ProductDetails = () => {
  return (
    <section className="py-24 md:py-32 bg-bg-soft">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="text-center mb-16 md:mb-20">
          <p className="small-label text-text-muted mb-4">
            CRAFTED FOR EVERYDAY LIFE
          </p>
          <h2 className="text-foreground">
            Thoughtfully designed. <span className="italic font-normal">Effortlessly yours.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group h-auto lg:h-[210px]"
            >
              <div className={`w-full h-[110px] rounded-[16px] ${detail.color} mb-4 flex items-center justify-center border border-card-border overflow-hidden transition-all duration-500 group-hover:shadow-md`}>
                <div className="text-[10px] text-text-muted/30 uppercase tracking-widest px-4">
                  Feature
                </div>
              </div>
              <h3 className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-bold text-foreground mb-1">
                {detail.title}
              </h3>
              <p className="text-[13px] text-text-secondary leading-relaxed max-w-[140px]">
                {detail.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
