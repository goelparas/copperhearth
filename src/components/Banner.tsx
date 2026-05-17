"use client";

import React from "react";
import { Gift } from "lucide-react";

const Banner = () => {
  const handleScrollToSignup = () => {
    const el = document.getElementById("signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={handleScrollToSignup}
      className="fixed top-0 w-full z-60 bg-brand-forest py-[10px] px-4 overflow-hidden h-[42px] flex items-center cursor-pointer select-none"
    >
      <div className="container mx-auto flex justify-center items-center space-x-3">
        <Gift
          className="text-brand-copper animate-pulse"
          size={18}
          strokeWidth={1.5}
        />
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-background text-center leading-tight">
          Join now & get extra 10% off at launch
        </span>
      </div>
    </div>
  );
};

export default Banner;
