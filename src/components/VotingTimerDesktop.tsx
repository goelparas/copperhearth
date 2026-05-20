"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const STORAGE_KEY = "copperheritage_desktop_timer";

const DesktopTimer = () => {
  const [mounted, setMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    setMounted(true);

    let targetTime: number;

    const savedTarget = localStorage.getItem(STORAGE_KEY);

    if (savedTarget) {
      targetTime = Number(savedTarget);
    } else {
      // 24 hours countdown
      targetTime = Date.now() + 24 * 60 * 60 * 1000;

      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();

      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });

        clearInterval(interval);

        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24),
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24,
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60,
      );

      const seconds = Math.floor(
        (difference / 1000) % 60,
      );

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className="
        hidden lg:flex
        items-center gap-7
        px-7 py-5
        rounded-[1.75rem]
        bg-[#06261F]
        border border-[#0E3B31]
        shadow-[0_10px_40px_rgba(0,0,0,0.12)]
      "
    >
      {/* Left */}
      <div className="flex flex-col">
        <span
          className="
            text-[0.62rem]
            tracking-[0.24em]
            uppercase
            text-[#B7C6BF]/70
            font-semibold
          "
        >
          Voting closes in
        </span>

        <div className="flex items-end gap-5 mt-2">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hrs" },
            { value: timeLeft.minutes, label: "Min" },
            { value: timeLeft.seconds, label: "Sec" },
          ].map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="text-center min-w-[48px]">
                <div className="text-white text-2xl font-semibold tracking-tight">
                  {item.value}
                </div>

                <div
                  className="
                    text-[0.55rem]
                    uppercase
                    tracking-[0.18em]
                    text-[#B7C6BF]/60
                    mt-1
                  "
                >
                  {item.label}
                </div>
              </div>

              {idx !== 3 && (
                <span className="text-white/20 text-xl font-semibold mb-4">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-14 bg-white/10" />

      {/* Right */}
      <div className="flex flex-col">
        <span
          className="
            text-[0.58rem]
            uppercase
            tracking-[0.22em]
            text-[#B7C6BF]/60
            font-semibold
          "
        >
          Top voted
        </span>

        <span className="text-[#D9A05B] text-sm font-semibold mt-1 tracking-wide">
          Ships First
        </span>

        <span className="text-white/40 text-[0.65rem] mt-2 tracking-wide">
          Limited launch batch
        </span>
      </div>
    </motion.div>
  );
};

export default DesktopTimer;