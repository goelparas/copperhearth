"use client";

import React from "react";
import { Gift } from "lucide-react";
import { trackCtaClick } from "@/utils/analytics";

const Banner = () => {
  const handleScrollToSignup = () => {
    trackCtaClick("top_banner", "#signup");
    const el = document.getElementById("signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={handleScrollToSignup}
      className="fixed top-0 w-full z-60 bg-brand-forest py-[0.625rem] md:py-4 px-4 overflow-hidden h-[2.625rem] flex items-center cursor-pointer select-none"
    >
      <div className="container mx-auto flex justify-center items-center space-x-3">
        <Gift
          className="text-brand-copper animate-pulse"
          size={18}
          strokeWidth={1.5}
        />
        <span className="top-banner-text text-[0.625rem] sm:text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-center leading-tight">
          Join now & get extra 10% off at launch
        </span>
      </div>
    </div>
  );
};

export default Banner;
