"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Star, Gift } from "lucide-react";
import VotingTimer from "./VotingTimer";

interface Finish {
  id: string;
  name: string;
  color: string;
  votes: number;
  desc: string;
  textColor: string;
  titleColor: string;
  image: string;
  popular?: boolean;
  voted: boolean;
}

const initialFinishes: Finish[] = [
  {
    id: "copper",
    name: "Classic Copper",
    color: "bg-[#B87333]",
    votes: 1283,
    desc: "Raw Copper. Uncoated. Unfiltered.",
    textColor: "text-white/70",
    titleColor: "text-white",
    image: "/copper.jpeg",
    popular: false,
    voted: false,
  },
  {
    id: "champagne",
    name: "Warm Champagne",
    color: "bg-[#C8A882]",
    votes: 4861,
    desc: "Warmth for every kind of table.",
    popular: true,
    voted: false,
    textColor: "text-brand-forest/70",
    titleColor: "text-brand-forest",
    image: "/cream.jpeg",
  },
  {
    id: "green",
    name: "Forest Green",
    color: "bg-[#1B3022]",
    votes: 3025,
    desc: "Deep, grounded, built for the outdoors.",
    textColor: "text-white/70",
    titleColor: "text-white",
    image: "/green.jpeg",
    popular: false,
    voted: false,
  },
  {
    id: "black",
    name: "Matte Black",
    color: "bg-[#1A1A1A]",
    votes: 2194,
    desc: "No fuss. No finish. Just the bottle.",
    textColor: "text-white/70",
    titleColor: "text-white",
    image: "/black.jpeg",
    popular: false,
    voted: false,
  },
];

const VoteSection = () => {
  const [finishesList, setFinishesList] = useState<Finish[]>(initialFinishes);
  const [selectedFinish, setSelectedFinish] = useState<string>("champagne");
  const [activeTab, setActiveTab] = useState<"text" | "timer">("text");

  // Toggle active tab every 4 seconds for elegant sliding transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === "text" ? "timer" : "text"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Calculate total votes dynamically
  const totalVotes = finishesList.reduce((acc, f) => acc + f.votes, 0);

  // Toggle vote handler
  const handleVoteToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card selection when clicking vote button
    setFinishesList((prev) =>
      prev.map((finish) => {
        if (finish.id === id) {
          const isVoted = !finish.voted;
          return {
            ...finish,
            voted: isVoted,
            votes: isVoted ? finish.votes + 1 : finish.votes - 1,
          };
        }
        return finish;
      }),
    );
  };

  return (
    <section className="py-16 md:py-24 bg-[#F3ECE4]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Header Content */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-forest mb-8 leading-tight max-w-2xl">
            Choose the finish <br />
            that speaks to you.
          </h2>

          <div className="relative overflow-hidden h-14 flex items-center select-none w-full sm:w-auto">
            <AnimatePresence mode="wait">
              {activeTab === "text" ? (
                <motion.div
                  key="text-block"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center gap-4 absolute w-full sm:w-auto justify-center sm:justify-start"
                >
                  <div className="w-12 h-12 rounded-full border border-brand-copper/30 flex items-center justify-center text-brand-copper bg-white/40">
                    <Gift size={20} />
                  </div>
                  <p className="text-brand-forest/70 text-[15px] font-medium max-w-xs">
                    Your vote shapes what drops next.
                  </p>
                </motion.div>
              ) : (
                <VotingTimer />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Finish Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {finishesList.map((finish, index) => {
            // Compute percentage dynamically for the progress bar
            const percentage =
              totalVotes > 0 ? (finish.votes / totalVotes) * 100 : 0;

            return (
              <motion.div
                key={finish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedFinish(finish.id)}
                className={`relative h-[410px] max-w-[260px] mx-auto w-full rounded-3xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-500 overflow-hidden ${finish.color} ${
                  selectedFinish === finish.id
                    ? "ring-2 ring-brand-copper ring-offset-4 ring-offset-[#F3ECE4]"
                    : "hover:scale-[1.02]"
                }`}
              >
                {/* Card Content Top */}
                <div className="relative">
                  {finish.popular && (
                    <div className="inline-flex items-center gap-1 bg-brand-copper/90 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-3">
                      <Star size={8} fill="currentColor" />
                      Popular
                    </div>
                  )}

                  {/* Product Image Area */}
                  <div className="h-40 relative mb-3 flex items-center justify-center bg-white/5 rounded-xl overflow-hidden">
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
                  <h3
                    className={`text-xl font-serif mb-1 ${finish.titleColor}`}
                  >
                    {finish.name}
                  </h3>
                  <p
                    className={`text-xs mb-2 leading-relaxed max-w-[120px] text-nowrap  ${finish.textColor}`}
                  >
                    {finish.desc}
                  </p>

                  {/* Progress Bar showing actual votes in thousands */}
                  <div className="mb-4">
                    <div className="flex justify-between items-end mb-1">
                      <span
                        className={`text-lg font-bold ${finish.titleColor}`}
                      >
                        {finish.votes.toLocaleString()}
                      </span>
                      <span
                        className={`text-[9px] uppercase tracking-wider font-semibold opacity-60 ${finish.titleColor}`}
                      >
                        joined
                      </span>
                    </div>
                    <div className="h-0.5 w-full bg-white/20 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${finish.id === "champagne" ? "bg-brand-copper" : "bg-white"}`}
                      />
                    </div>
                  </div>

                  {/* Vote Button */}
                  <button
                    onClick={(e) => handleVoteToggle(finish.id, e)}
                    className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                      finish.voted
                        ? "bg-brand-copper text-white shadow-md shadow-brand-copper/20"
                        : "border border-white/20 text-white hover:bg-white/10"
                    } ${finish.id === "champagne" && !finish.voted ? "border-brand-forest/20 text-brand-forest hover:bg-brand-forest/5" : ""}`}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VoteSection;
