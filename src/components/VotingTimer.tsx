"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const STORAGE_KEY = "copperheritage_vote_timer";

const VotingTimer = () => {
  const [mounted, setMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const timeout = setTimeout(() => {
      setMounted(true);

      // Create / restore persistent target time
      let targetTime: number;
      const savedTarget = localStorage.getItem(STORAGE_KEY);
      const savedTime = savedTarget ? Number(savedTarget) : 0;

      if (savedTime && savedTime > Date.now()) {
        targetTime = savedTime;
      } else {
        // 24 hours from first visit
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

          return true; // expired
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

        return false; // not expired
      };

      // Initial call
      const isExpired = updateTimer();

      if (!isExpired) {
        interval = setInterval(() => {
          const expired = updateTimer();
          if (expired && interval) {
            clearInterval(interval);
          }
        }, 1000);
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      key="timer-block"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45 }}
      className="
        flex items-center justify-between
        w-full sm:w-auto
        gap-4
        p-2
        sm:px-5 sm:py-3.5
        bg-brand-forest
        border 
        shadow-[0_10px_30px_rgba(0,0,0,0.12)]
        select-none
        rounded-2xl
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className="
            w-12 h-12
            rounded-xl
            border border-white/10
            bg-white/3
            flex items-center justify-center
            shrink-0
          "
        >
          <Clock3
            size={20}
            className="text-[#E9DED1]"
            strokeWidth={2}
          />
        </div>

        {/* Timer */}
        <div className="flex flex-col">
          <span
            className="
              text-[0.55rem]
              font-semibold
              tracking-[0.22em]
              uppercase
              text-[#E9DED1]/55
              mb-2
            "
          >
            Voting closes in
          </span>

          <div className="flex items-center gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hrs", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds },
            ].map((item, idx) => (
              <React.Fragment key={item.label}>
                <div className="flex flex-col items-center min-w-[28px]">
                  <span
                    className="
                      text-white
                      text-lg
                      sm:text-xl
                      font-semibold
                      tracking-tight
                      leading-none
                    "
                  >
                    {item.value}
                  </span>

                  <span
                    className="
                      mt-1
                      text-[0.48rem]
                      uppercase
                      tracking-[0.18em]
                      text-[#E9DED1]/45
                      font-medium
                    "
                  >
                    {item.label}
                  </span>
                </div>

                {idx !== 3 && (
                  <span className="text-white/20 text-lg font-semibold -mt-3">
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px self-stretch bg-white/8" />

      {/* Right */}
      <div className="hidden sm:flex flex-col shrink-0">
        <span
          className="
            text-[0.52rem]
            uppercase
            tracking-[0.22em]
            text-[#E9DED1]/45
            font-semibold
          "
        >
          Top voted
        </span>

        <span
          className="
            mt-1
            text-brand-copper
            text-sm
            font-semibold
            tracking-wide
          "
        >
          Ships First
        </span>
      </div>
    </motion.div>
  );
};

export default VotingTimer;
