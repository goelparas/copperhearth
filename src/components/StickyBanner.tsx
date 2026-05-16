"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SignupModal from "./SignupModal";

const StickyBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 w-full z-[60] bg-brand-dark py-2 px-4">
        <div className="container mx-auto flex justify-center items-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center space-x-2 text-brand-light hover:text-brand-accent transition-colors"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium">
              Join now and access now
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-brand-accent"
            >
              →
            </motion.span>
          </button>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default StickyBanner;
