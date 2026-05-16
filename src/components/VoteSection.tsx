"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Star, Gift } from "lucide-react";

const finishes = [
  {
    id: "copper",
    name: "Classic Copper",
    color: "bg-[#B87333]",
    votes: 12,
    desc: "Pure. Timeless. Iconic.",
    textColor: "text-white/70",
    titleColor: "text-white",
    image: "/copper.jpeg",
  },
  {
    id: "champagne",
    name: "Warm Champagne",
    color: "bg-[#E5D5C5]",
    votes: 34,
    desc: "Subtle. Warm. Effortless.",
    popular: true,
    voted: true,
    textColor: "text-brand-forest/70",
    titleColor: "text-brand-forest",
    image: "/cream.jpeg",
  },
  {
    id: "green",
    name: "Forest Green",
    color: "bg-[#1B3022]",
    votes: 28,
    desc: "Deep. Earthy. Timeless.",
    textColor: "text-white/70",
    titleColor: "text-white",
    image: "/green.jpeg",
  },
  {
    id: "black",
    name: "Matte Black",
    color: "bg-[#1A1A1A]",
    votes: 18,
    desc: "Bold. Minimal. Always in style.",
    textColor: "text-white/70",
    titleColor: "text-white",
    image: "/black.jpeg",
  },
];

const VoteSection = () => {
  const [selectedFinish, setSelectedFinish] =
    React.useState<string>("champagne");

  return (
    <section className="py-16 md:py-24 bg-[#F3ECE4]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Header Content */}
        <div className="mb-12">
          <p className="text-brand-copper font-bold uppercase tracking-[0.2em] text-[12px] mb-4">
            Vote for your favourite finish
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-forest mb-8 leading-tight max-w-2xl">
            Choose the finish <br />
            that speaks to you.
          </h2>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-brand-copper/30 flex items-center justify-center text-brand-copper">
              <Gift size={20} />
            </div>
            <p className="text-brand-forest/70 text-[15px] font-medium max-w-xs">
              Your vote helps decide what launches first.
            </p>
          </div>
        </div>

        {/* Finish Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {finishes.map((finish, index) => (
            <motion.div
              key={finish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedFinish(finish.id)}
              className={`relative h-[380px] max-w-[260px] mx-auto w-full rounded-[24px] p-5 flex flex-col justify-between cursor-pointer transition-all duration-500 overflow-hidden ${finish.color} ${
                selectedFinish === finish.id
                  ? "ring-2 ring-brand-copper ring-offset-4 ring-offset-[#F3ECE4]"
                  : "hover:scale-[1.02]"
              }`}
            >
              {/* Card Content Top */}
              <div className="relative z-10">
                {finish.popular && (
                  <div className="inline-flex items-center gap-1 bg-brand-copper/90 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-3">
                    <Star size={8} fill="currentColor" />
                    Popular
                  </div>
                )}

                {/* Product Image Area */}
                <div className="h-36 relative mb-3 flex items-center justify-center bg-white/5 rounded-xl overflow-hidden">
                  <div className="w-full h-full p-2 transition-transform duration-700 group-hover:scale-110">
                    <Image
                      src={finish.image}
                      alt={finish.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Card Content Bottom */}
              <div className="relative z-10">
                <h3 className={`text-xl font-serif mb-1 ${finish.titleColor}`}>
                  {finish.name}
                </h3>
                <p
                  className={`text-xs mb-1 leading-relaxed max-w-[120px] text-nowrap ${finish.textColor}`}
                >
                  {finish.desc}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-1">
                    <span className={`text-lg font-bold ${finish.titleColor}`}>
                      {finish.votes}%
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-wider font-semibold opacity-60 ${finish.titleColor}`}
                    >
                      of votes
                    </span>
                  </div>
                  <div className="h-[1px] w-full bg-white/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${finish.votes}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full ${finish.id === "champagne" ? "bg-brand-copper" : "bg-white"}`}
                    />
                  </div>
                </div>

                {/* Vote Button */}
                <button
                  className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    finish.voted
                      ? "bg-brand-copper text-white"
                      : "border border-white/20 text-white hover:bg-white/10"
                  } ${finish.id === "champagne" && !finish.voted ? "border-brand-forest/20 text-brand-forest" : ""}`}
                >
                  <Heart
                    size={12}
                    fill={finish.voted ? "currentColor" : "none"}
                  />
                  {finish.voted ? "Voted" : "Vote"}
                </button>
              </div>

              {/* Decorative GH Logo Background */}
              <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                <Image
                  src="/logo.png"
                  alt=""
                  width={200}
                  height={200}
                  className={
                    finish.id === "champagne"
                      ? "brightness-0"
                      : "brightness-0 invert"
                  }
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoteSection;
