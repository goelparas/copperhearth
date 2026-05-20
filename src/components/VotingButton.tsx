"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface VoteButtonProps {
  voted: boolean;
  finishId: string;
  onVote: (e: React.MouseEvent) => void;
  isChampagne?: boolean;
}

const VoteButton = ({
  voted,
  finishId,
  onVote,
  isChampagne,
}: VoteButtonProps) => {
  const STORAGE_KEY = `vote-story-${finishId}`;

  const [showBurst, setShowBurst] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    onVote(e);

    // show animation only first time
    if (!voted) {
      const alreadyPlayed = localStorage.getItem(STORAGE_KEY);

      if (!alreadyPlayed) {
        setShowBurst(true);

        localStorage.setItem(STORAGE_KEY, "true");

        setTimeout(() => {
          setShowBurst(false);
        }, 1800);
      }
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Instagram Story Style Burst */}
      <AnimatePresence>
        {showBurst && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute inset-0
              rounded-full
              bg-gradient-to-r
              from-[#F58529]
              via-[#DD2A7B]
              to-[#8134AF]
              blur-2xl
              z-0
            "
          />
        )}
      </AnimatePresence>

      {/* Floating hearts */}
      <AnimatePresence>
        {showBurst && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0.4,
                  y: 0,
                  x: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.4, 1.2, 0.7],
                  y: -60 - i * 8,
                  x:
                    i % 2 === 0
                      ? -20 - i * 2
                      : 20 + i * 2,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 z-20"
              >
                <Heart
                  size={14 + i}
                  fill="currentColor"
                  className="text-pink-400"
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Actual Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        whileHover={{ y: -1 }}
        onClick={handleClick}
        className={`relative z-10 w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
          voted
            ? "bg-brand-copper text-white shadow-md shadow-brand-copper/20"
            : "border border-white/20 text-white hover:bg-white/10"
        } ${
          isChampagne && !voted
            ? "border-brand-forest/20 text-brand-forest hover:bg-brand-forest/5"
            : ""
        }`}
      >
        <motion.div
          animate={
            voted
              ? {
                  scale: [1, 1.25, 1],
                }
              : {}
          }
          transition={{
            duration: 0.45,
          }}
        >
          <Heart
            size={13}
            fill={voted ? "currentColor" : "none"}
            className={
              voted
                ? "scale-110 transition-transform duration-300"
                : ""
            }
          />
        </motion.div>

        {voted ? "Voted" : "Vote"}
      </motion.button>
    </div>
  );
};

export default VoteButton;