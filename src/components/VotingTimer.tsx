"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const STORAGE_KEY = "copper-heritage-voting-end-time";

const VotingTimer = () => {
  const [mounted, setMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "24",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    setMounted(true);

    // Persist timer even after unmount / refresh
    let savedTarget = localStorage.getItem(STORAGE_KEY);

    let targetTime: number;

    if (savedTarget) {
      targetTime = parseInt(savedTarget, 10);
    } else {
      targetTime = Date.now() + 24 * 60 * 60 * 1000;

      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const updateTimer = () => {
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });

        localStorage.removeItem(STORAGE_KEY);

        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));

      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);

      const m = Math.floor((difference / 1000 / 60) % 60);

      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      key="timer-block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        flex items-center justify-center
        sm:justify-start
        gap-3 sm:gap-4
        w-full sm:w-auto
        bg-brand-forest
        text-[#E9DED1]
        py-1.5 px-3.5
      rounded-sm
        border border-white/5
        shadow-md shadow-brand-forest/10
      "
    >
      {/* Icon */}
      <div
        className="
          w-8 h-8
          rounded-xl
          bg-brand-copper
          flex items-center justify-center
          text-brand-forest
          shrink-0
        "
      >
        <Clock size={16} />
      </div>

      {/* Timer */}
      <div className="flex flex-col">
        <span
          className="
            text-[6px] sm:text-[7px]
            font-bold
            tracking-widest
            text-[#E9DED1]/60
            uppercase
            leading-none
            mb-1
          "
        >
          VOTING CLOSES IN
        </span>

        <div className="flex items-center space-x-1.5 leading-none">
          {[
            { label: "days", value: timeLeft.days },
            { label: "hrs", value: timeLeft.hours },
            { label: "min", value: timeLeft.minutes },
            { label: "sec", value: timeLeft.seconds },
          ].map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center">
                <span
                  className="
                    font-serif
                    text-[13px]
                    font-bold
                    text-white
                    leading-none
                  "
                >
                  {item.value}
                </span>

                <span
                  className="
                    text-[5px]
                    text-[#E9DED1]/50
                    mt-0.5
                    font-semibold
                    tracking-wider
                    uppercase
                  "
                >
                  {item.label}
                </span>
              </div>

              {idx !== 3 && (
                <span
                  className="
                    text-white/40
                    text-[9px]
                    font-bold
                    leading-none
                  "
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-0.5 h-6 bg-white/10 self-stretch shrink-0" />

      {/* Right Text */}
      <div
        className="
          flex flex-col
          pl-1
          text-left
          leading-tight
          select-none
          shrink-0
        "
      >
        <span
          className="
            text-[8px]
            font-sans
            font-bold
            text-white
            uppercase
            tracking-tight
          "
        >
          Top voted
        </span>

        <span
          className="
            text-[8px]
            font-sans
            font-black
            text-brand-copper
            uppercase
            tracking-tight
          "
        >
          ships first
        </span>
      </div>
    </motion.div>
  );
};

export default VotingTimer;
