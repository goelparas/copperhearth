"use client";

import React from "react";
import { Droplets, Leaf, ShieldCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Droplets size={32} strokeWidth={1} />,
    title: "Better Hydration",
  },
  {
    icon: <Leaf size={32} strokeWidth={1} />,
    title: "Natural Wellness",
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1} />,
    title: "Easy to Maintain",
  },
  {
    icon: <Award size={32} strokeWidth={1} />,
    title: "Timeless Quality",
  },
];

const FeatureBar = () => {
  return (
    <section className="bg-bg-soft flex items-center min-h-[160px] lg:min-h-[220px] py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-[32px]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center flex-1 min-w-[140px]"
            >
              <div className="text-brand-copper mb-4">
                {feature.icon}
              </div>
              <span className="small-label text-foreground">
                {feature.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBar;
