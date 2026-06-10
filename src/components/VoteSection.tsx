"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Gift } from "lucide-react";
import VotingButton from '@/components/VotingButton'
import VotingTimer from "./VotingTimer";
import VotingTimerDesktop from '@/components/VotingTimerDesktop'
import { trackVote } from "@/utils/analytics";

interface Finish {
  id: string;
  name: string;
  color: string;
  votes: number;
  desc: string;
  textColor: string;
  titleColor: string;
  image: string;
  imageAlt: string;
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
    imageAlt: "Classic raw copper tumbler, uncoated and unfinished, 99.9% pure copper",
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
    imageAlt: "Warm champagne finish copper tumbler, handcrafted for modern Indian homes",
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
    imageAlt: "Forest green copper tumbler with matte exterior finish",
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
    imageAlt: "Matte black copper tumbler, minimal design with pure copper interior",
    popular: false,
    voted: false,
  },
];

const VoteSection = () => {
  const [finishesList, setFinishesList] = useState<Finish[]>(initialFinishes);
  const [selectedFinish, setSelectedFinish] = useState<string>("champagne");
  const [activeTab, setActiveTab] = useState<"text" | "timer">("text");


  // Load from localStorage on client mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      const storedVotes = localStorage.getItem("vote_finishes_counts");
      let parsedVotes: Record<string, number> = {};
      if (storedVotes) {
        try {
          parsedVotes = JSON.parse(storedVotes);
        } catch (e) {
          console.error("Failed to parse stored votes:", e);
        }
      }

      setFinishesList((prev) =>
        prev.map((finish) => {
          const storedVal = parsedVotes[finish.id];
          const userVoted = localStorage.getItem(`voted_state_${finish.id}`) === "true";
          return {
            ...finish,
            votes: typeof storedVal === "number" && storedVal >= finish.votes ? storedVal : finish.votes,
            voted: userVoted,
          };
        })
      );
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  // Toggle active tab every 4 seconds for elegant sliding transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === "text" ? "timer" : "text"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Live simulation to increment votes by random numbers over time
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const simulateVotes = () => {
      setFinishesList((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const updated = prev.map((finish, idx) => {
          if (idx === randomIndex) {
            const increment = Math.floor(Math.random() * 3) + 1; // 1 to 3 votes
            return {
              ...finish,
              votes: finish.votes + increment,
            };
          }
          return finish;
        });

        // Save new simulated counts to localStorage
        const voteMap = updated.reduce((acc, f) => {
          acc[f.id] = f.votes;
          return acc;
        }, {} as Record<string, number>);
        localStorage.setItem("vote_finishes_counts", JSON.stringify(voteMap));

        return updated;
      });

      // Schedule next simulation after 8 to 20 seconds
      const nextDelay = (Math.random() * 12 + 8) * 1000;
      timeoutId = setTimeout(simulateVotes, nextDelay);
    };

    const initialDelay = (Math.random() * 10 + 5) * 1000;
    timeoutId = setTimeout(simulateVotes, initialDelay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Calculate total votes dynamically
  const totalVotes = finishesList.reduce((acc, f) => acc + f.votes, 0);

  const castVote = async (id: string, finishName: string, email: string = "", phone: string = "") => {
    // 1. Update state & localStorage locally (optimistic/immediate UX feedback)
    setFinishesList((prev) => {
      const updated = prev.map((finish) => {
        if (finish.id === id) {
          return {
            ...finish,
            voted: true,
            votes: finish.votes + 1,
          };
        }
        return finish;
      });

      // Save new counts to localStorage
      const voteMap = updated.reduce((acc, f) => {
        acc[f.id] = f.votes;
        return acc;
      }, {} as Record<string, number>);
      localStorage.setItem("vote_finishes_counts", JSON.stringify(voteMap));
      localStorage.setItem(`voted_state_${id}`, "true");

      return updated;
    });

    // 2. Track event
    trackVote(id, finishName, true);

    // 3. Make API call to backend /api/vote
    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          finishId: id,
          finishName,
          email,
          phone,
        }),
      });
    } catch (err) {
      console.error("Failed to register vote backend API call:", err);
    }
  };

  const removeVote = (id: string, finishName: string) => {
    setFinishesList((prev) => {
      const updated = prev.map((finish) => {
        if (finish.id === id) {
          return {
            ...finish,
            voted: false,
            votes: Math.max(0, finish.votes - 1),
          };
        }
        return finish;
      });

      // Save new counts to localStorage
      const voteMap = updated.reduce((acc, f) => {
        acc[f.id] = f.votes;
        return acc;
      }, {} as Record<string, number>);
      localStorage.setItem("vote_finishes_counts", JSON.stringify(voteMap));
      localStorage.setItem(`voted_state_${id}`, "false");

      return updated;
    });

    // Track event
    trackVote(id, finishName, false);
  };

  // Toggle vote handler
  const handleVoteToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card selection when clicking vote button
    
    const finishToUpdate = finishesList.find((f) => f.id === id);
    if (!finishToUpdate) return;

    if (finishToUpdate.voted) {
      // Un-vote
      removeVote(id, finishToUpdate.name);
    } else {
      // Vote immediately!
      castVote(id, finishToUpdate.name);
    }
  };

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-[#F3ECE4]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Content */}
        {/* Header Content */}
<div className="mb-10 md:mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
  
  {/* Left */}
  <div className="max-w-3xl">
    <h2 className="text-3xl [400px]:text-4xl md:text-5xl lg:text-6xl font-serif text-brand-forest leading-[0.95] tracking-[-0.04em]">
      Choose the finish <br />
      that speaks to you.
    </h2>

    {/* Mobile supporting text */}
    <p className="mt-4 md:mt-5 text-sm md:text-base text-brand-forest/65 leading-relaxed max-w-md lg:hidden">
      Vote for your favorite one. <br/> The most loved design ships first during launcsh.
    </p>
  </div>

  {/* Right Desktop Premium Panel */}
  <div className="w-full lg:w-auto shrink-0">
    
    {/* MOBILE VERSION — untouched feeling */}
    <div className="lg:hidden relative overflow-hidden h-20 flex items-center select-none">
      <AnimatePresence mode="wait">
        {activeTab === "text" ? (
          <motion.div
            key="text-block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-4 absolute w-full"
          >
            <div className="w-12 h-12 rounded-full border border-brand-copper/30 flex items-center justify-center text-brand-copper bg-white/40 shadow-xs">
              <Gift size={20} />
            </div>

            <p className="text-brand-forest/70 text-sm font-medium">
              Your vote shapes what drops next.
            </p>
          </motion.div>
        ) : (
          <VotingTimer />
        )}
      </AnimatePresence>
    </div>
    <div className="md:block hidden">

         <VotingTimerDesktop/>
    </div>
  </div>
</div>

        {/* Finish Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
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
                className={`group relative max-w-75 sm:max-w-none mx-auto w-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-500 overflow-hidden border ${
                  finish.id === "champagne" ? "border-brand-forest/10" : "border-white/10"
                } ${finish.color} ${
                  selectedFinish === finish.id
                    ? "ring-2 ring-brand-copper ring-offset-4 ring-offset-[#F3ECE4]"
                    : "hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-forest/10"
                }`}
              >
                {/* Subtle rich gradient lighting overlay */}
                <div className={`absolute inset-0 pointer-events-none bg-linear-to-b from-white/${finish.id === "champagne" ? "20" : "10"} to-transparent`} />

                {/* Card Content Top */}
                <div className="relative z-10 w-full">
                  {finish.popular && (
                    <div className="inline-flex items-center gap-1 bg-brand-copper/90 text-white text-[0.5rem] sm:text-[0.5625rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 shadow-sm">
                      <Star size={8} fill="currentColor" />
                      Popular
                    </div>
                  )}

                  {/* Product Image Area */}
                  <div className={`h-44 lg:h-48 xl:h-52 relative mb-4 flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500 shadow-inner border ${
                    finish.id === "champagne" 
                      ? "bg-brand-forest/4 border-brand-forest/5" 
                      : "bg-white/6 border-white/5"
                  }`}>
                    <div className="w-full h-full p-2 transition-transform duration-700 group-hover:scale-108">
                      <Image
                        src={finish.image}
                        alt={finish.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Content Bottom */}
                <div className="relative z-10 w-full mt-auto">
                  <h3
                    className={`text-xl sm:text-2xl font-serif mb-1.5 tracking-wide leading-snug ${finish.titleColor}`}
                  >
                    {finish.name}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm mb-4 leading-relaxed opacity-85 ${finish.textColor}`}
                  >
                    {finish.desc}
                  </p>

                  {/* Progress Bar showing actual votes in thousands */}
                  <div className="mb-5">
                    <div className="flex justify-between items-end mb-1.5">
                      <span
                        className={`text-xl sm:text-2xl font-bold tracking-tight ${finish.titleColor}`}
                      >
                        {finish.votes.toLocaleString()}
                      </span>
                      <span
                        className={`text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-70 ${finish.titleColor}`}
                      >
                        joined
                      </span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden border ${
                      finish.id === "champagne" 
                        ? "bg-brand-forest/10 border-brand-forest/5" 
                        : "bg-white/15 border-white/5"
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${finish.id === "champagne" ? "bg-brand-copper" : "bg-white"}`}
                      />
                    </div>
                  </div>

                  {/* Vote Button */}
                  {/* <button
                    onClick={(e) => handleVoteToggle(finish.id, e)}
                    className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-98 ${
                      finish.voted
                        ? "bg-brand-copper text-white shadow-md shadow-brand-copper/20"
                        : "border border-white/20 text-white hover:bg-white/10"
                    } ${finish.id === "champagne" && !finish.voted ? "border-brand-forest/20 text-brand-forest hover:bg-brand-forest/5" : ""}`}
                  >
                    <Heart
                      size={13}
                      fill={finish.voted ? "currentColor" : "none"}
                      className={finish.voted ? "scale-110 transition-transform duration-300" : ""}
                    />
                    {finish.voted ? "Voted" : "Vote"}
                  </button> */}
                  <VotingButton
  voted={finish.voted}
  finishId={finish.id}
  onVote={(e) => handleVoteToggle(finish.id, e)}
  isChampagne={finish.id === "champagne"}
/>
                </div>

                {/* Decorative GH Logo Background */}
                <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none transition-transform duration-700 group-hover:scale-105">
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
