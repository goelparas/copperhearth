"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "30",
    seconds: "00",
  });
  const [mounted, setMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [wiggleTrigger, setWiggleTrigger] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Mock target date: exactly 30 minutes from first mount
    const targetTime = Date.now() + 30 * 60 * 1000;

    const updateTimer = () => {
      const difference = targetTime - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
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
    const timerInterval = setInterval(updateTimer, 1000);

    // Scroll listener for sticky sticky container
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Wiggle attention-grabbing animation every 2 seconds
    const wiggleInterval = setInterval(() => {
      setWiggleTrigger((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(wiggleInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToSignup = () => {
    const el = document.getElementById("signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null;

  // Single card element helper - High Contrast Dark Forest Green with Gold/Copper numbers
  const TimeCard = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center justify-center rounded-2xl w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-brand-forest border border-white/10 shadow-lg shadow-brand-forest/20 transition-all duration-300 group-hover:scale-105">
      <span className="font-serif text-xl sm:text-2xl md:text-4xl text-brand-copper leading-none font-semibold">
        {value}
      </span>
      <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-widest font-sans font-bold text-white/50 mt-1 sm:mt-1.5 select-none">
        {label}
      </span>
    </div>
  );

  return (
    <>
      {/* Inline Countdown layout - Replaces original "Get Extra 10% on Launch" */}
      <div
        onClick={handleScrollToSignup}
        className="flex flex-col items-center md:items-start select-none cursor-pointer group"
      >
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <TimeCard value={timeLeft.days} label="DAYS" />
          <span className="text-xl md:text-3xl text-brand-forest/60 font-bold leading-none">
            :
          </span>
          <TimeCard value={timeLeft.hours} label="HRS" />
          <span className="text-xl md:text-3xl text-brand-forest/60 font-bold leading-none">
            :
          </span>
          <TimeCard value={timeLeft.minutes} label="MINS" />
          <span className="text-xl md:text-3xl text-brand-forest/60 font-bold leading-none">
            :
          </span>
          <TimeCard value={timeLeft.seconds} label="SECS" />
        </div>
      </div>

      {/* Floating Sticky Mobile / Tablet Widget with High-Energy Wiggle */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-4 left-4 right-4 z-100 block lg:hidden"
          >
            <motion.div
              onClick={handleScrollToSignup}
              animate={
                wiggleTrigger
                  ? { rotate: [0, -3, 3, -3, 3, 0], scale: [1, 1.02, 1.02, 1] }
                  : { rotate: [0, -3, 3, -3, 3, 0], scale: [1, 1.02, 1.02, 1] }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-[#F5EFEB]/95 backdrop-blur-md rounded-3xl p-3 border-2 border-brand-copper/30 shadow-2xl flex items-center justify-between shadow-brand-forest/15 cursor-pointer active:scale-95 transition-transform"
            >
              {/* Sticky Left: Tiny flame tag & CTA */}
              <div className="flex items-center space-x-2 pl-2">
                <div className="w-8 h-8 rounded-full bg-brand-forest flex items-center justify-center text-brand-copper shadow-xs">
                  <Flame size={16} className="fill-current animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-black tracking-wider text-brand-forest uppercase">
                    Launch Offer
                  </span>
                  <span className="text-[8px] font-sans font-bold text-brand-copper tracking-tight">
                    Extra 10% Ending Soon
                  </span>
                </div>
              </div>

              {/* Sticky Right: Compact Ticking Numbers in Dark Forest Green */}
              <div className="flex items-center space-x-1 sm:space-x-2 pr-1">
                <div className="flex flex-col items-center bg-brand-forest px-2 py-1.5 rounded-lg min-w-[32px] border border-white/5">
                  <span className="font-serif text-[13px] text-brand-copper font-bold leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="text-[5px] font-bold text-white/50 mt-0.5 tracking-wider">
                    DAYS
                  </span>
                </div>
                <span className="text-brand-forest/40 font-bold text-[10px]">
                  :
                </span>
                <div className="flex flex-col items-center bg-brand-forest px-2 py-1.5 rounded-lg min-w-[32px] border border-white/5">
                  <span className="font-serif text-[13px] text-brand-copper font-bold leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[5px] font-bold text-white/50 mt-0.5 tracking-wider">
                    HRS
                  </span>
                </div>
                <span className="text-brand-forest/40 font-bold text-[10px]">
                  :
                </span>
                <div className="flex flex-col items-center bg-brand-forest px-2 py-1.5 rounded-lg min-w-[32px] border border-white/5">
                  <span className="font-serif text-[13px] text-brand-copper font-bold leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[5px] font-bold text-white/50 mt-0.5 tracking-wider">
                    MINS
                  </span>
                </div>
                <span className="text-brand-forest/40 font-bold text-[10px]">
                  :
                </span>
                <div className="flex flex-col items-center bg-brand-forest px-2 py-1.5 rounded-lg min-w-[32px] border border-white/5">
                  <span className="font-serif text-[13px] text-brand-copper font-bold leading-none">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[5px] font-bold text-white/50 mt-0.5 tracking-wider">
                    SECS
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CountdownTimer;
