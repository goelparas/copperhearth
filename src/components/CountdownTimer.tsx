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
  const [showInHeader, setShowInHeader] = useState(false);

  useEffect(() => {
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

    const handleScroll = () => {
      const hero = document.querySelector("section");
      const heroBottom = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY
        : window.innerHeight * 0.9;

      setShowInHeader(window.scrollY > heroBottom - 96);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleScrollToSignup = () => {
    const el = document.getElementById("signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {showInHeader && (
        <motion.button
          type="button"
          onClick={handleScrollToSignup}
          initial={{ opacity: 0, x: 18, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 12, scale: 0.96 }}
          transition={{ duration: 0.35, ease: "easeIn" }}
          className="flex items-center gap-1.5 rounded-full border border-brand-copper/30 bg-[#F5EFEB]/95 px-2 py-1.5 shadow-lg shadow-brand-forest/10 backdrop-blur-md transition-transform active:scale-95 sm:gap-2 sm:px-2.5"
          aria-label="Extra 10 percent offer ending soon"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-forest text-brand-copper sm:h-7 sm:w-7">
            <Flame size={13} className="fill-current sm:size-3.5" />
          </span>

          <span className="flex min-w-0 max-w-[5.25rem] flex-col text-left leading-none sm:max-w-none">
            <span className="truncate text-[0.42rem] font-black uppercase tracking-[0.1em] text-brand-forest sm:text-[0.5rem] sm:tracking-[0.14em]">
              Exclusive Offer
            </span>
            <span className="mt-0.5 truncate text-[0.42rem] font-bold text-brand-copper sm:mt-1 sm:text-[0.5rem]">
              Extra 10% Ending Soon
            </span>
          </span>

          <span className="flex items-center gap-1 leading-none">
            {[
              { label: "h", value: timeLeft.hours },
              { label: "m", value: timeLeft.minutes },
              { label: "s", value: timeLeft.seconds },
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                <span className="flex min-w-[1.35rem] flex-col items-center rounded-md bg-brand-forest px-1 py-1 sm:min-w-[1.55rem] sm:px-1.5">
                  <span className="font-serif text-[0.68rem] font-bold text-brand-copper sm:text-[0.75rem]">
                    {item.value}
                  </span>
                  <span className="text-[0.25rem] font-bold uppercase tracking-wider text-white/50">
                    {item.label}
                  </span>
                </span>
                {index !== 2 && (
                  <span className="text-[0.5rem] font-black text-brand-forest/40">
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default CountdownTimer;
