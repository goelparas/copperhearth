"use client";

import React from "react";
import { Gift } from "lucide-react";

const Banner = () => {
  return (
    <div className="fixed top-0 w-full z-[70] bg-brand-forest py-[10px] px-4 overflow-hidden h-[42px] flex items-center">
      <div className="container mx-auto flex justify-center items-center space-x-3">
        <Gift className="text-brand-copper animate-pulse" size={16} />
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-background text-center leading-tight">
          PRELAUNCH OFFER: Join now & get extra 10% off at launch
        </span>
      </div>
    </div>
  );
};

export default Banner;
