"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const details = [
  {
    title: "PURE COPPER INTERIOR",
    desc: "99.9% pure copper naturally enriches every sip.",
    color: "bg-[#D9A67C]/20",
    image: "/mouth.jpeg",
  },
  {
    title: "LEAK-PROOF LID",
    desc: "Sealed tight. Your water stays in, always.",
    color: "bg-[#B87333]/20",
    image: "/leak-proof.jpeg",
  },
  {
    title: "DOUBLE-WALL INSULATION",
    desc: "Keeps your drink cooler, longer — naturally.",
    color: "bg-[#8B4513]/20",
    image: "/thermal.jpeg",
  },
  {
    title: "ERGONOMIC HANDLE",
    desc: "Balanced grip built for every kind of day.",
    color: "bg-[#A0522D]/20",
    image: "/handle.jpeg",
  },
];

const ProductDetails = () => {
  return (
    <section className="py-12 md:py-32 bg-bg-soft">
      <div className="container mx-auto px-6 max-w-[80rem]">
        <div className="text-center mb-16 md:mb-20">
          <p className="small-label text-text-muted mb-4">
            CRAFTED FOR EVERYDAY LIFE
          </p>
          <h2 className="text-foreground">
            Thoughtfully designed.{" "}
            <span className="italic font-normal">Effortlessly yours.</span>
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
              className="flex flex-col items-center text-center group h-auto lg:h-[13.125rem]"
            >
              <div
                className={`w-full h-32 rounded-2xl ${detail.color} mb-4 flex items-center justify-center border border-card-border overflow-hidden transition-all duration-500 group-hover:shadow-md relative`}
              >
                <Image
                  src={detail.image}
                  alt={detail.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-[0.6875rem] md:text-[0.75rem] uppercase tracking-[0.2em] font-bold text-foreground mb-1">
                {detail.title}
              </h3>
              <p className="text-[0.8125rem] text-text-secondary leading-relaxed max-w-[8.75rem]">
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
