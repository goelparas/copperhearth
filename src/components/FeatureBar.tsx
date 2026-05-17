"use client";

import { Droplets, Leaf, ShieldCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    id: "natural-hydration",
    icon: <Droplets size={28} strokeWidth={1} />,
    title: (
      <>
        Natural <br /> Hydration
      </>
    ),
  },
  {
    id: "rooted-in-tradition",
    icon: <Leaf size={28} strokeWidth={1} />,
    title: (
      <>
        Rooted in <br /> Tradition
      </>
    ),
  },
  {
    id: "easy-to-maintain",
    icon: <ShieldCheck size={28} strokeWidth={1} />,
    title: (
      <>
        Easy to <br /> Maintain
      </>
    ),
  },
  {
    id: "lasts-a-lifetime",
    icon: <Award size={28} strokeWidth={1} />,
    title: (
      <>
        Lasts a <br /> Lifetime
      </>
    ),
  },
];

const FeatureBar = () => {
  return (
    <section className="bg-bg-soft flex items-center h-[10dvh]">
      <div className="flex  justify-center lg:justify-between items-center w-full lg:gap-[32px]">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center leading-tight text-center flex-1 border-r border-r-gray-200"
          >
            <div className="text-brand-copper mb-0.5">{feature.icon}</div>
            <span className="text-foreground font-sans font-semibold uppercase text-[10px]">
              {feature.title}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureBar;
