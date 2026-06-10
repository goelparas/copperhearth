"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Check } from "lucide-react";

const DiscountModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [chosenOption, setChosenOption] = useState<
    "claimed" | "full_price" | null
  >(null);

  useEffect(() => {
    const preference = localStorage.getItem("discount_preference");
    if (!preference) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = async (option: "claimed" | "full_price") => {
    setChosenOption(option);
    localStorage.setItem("discount_preference", option);

    // Save to window for immediate page updates
    window.dispatchEvent(new Event("discount_preference_changed"));

    // Optimistic tracking/success
    setIsSuccess(true);

    try {
      await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "",
          phone: "",
          source: option === "claimed" ? "modal_claim" : "modal_full_price",
        }),
      });
    } catch (err) {
      console.error("Failed to record discount preference on server:", err);
    }

    // Close the modal after a short delay to show success state
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-forest/60 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="fixed inset-x-4 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 m-auto w-full max-w-md bg-[#F7F2EC] rounded-3xl p-8 md:p-10 shadow-2xl z-[101] border border-divider overflow-hidden"
          >
            {/* Close Button */}
            {!isSuccess && (
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-brand-forest/40 hover:text-brand-forest transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center flex flex-col items-center"
                >
                  {/* Premium Icon Circle */}
                  <div className="w-16 h-16 rounded-full bg-brand-copper/10 border border-brand-copper/20 flex items-center justify-center text-brand-copper mb-6 shadow-sm">
                    <Gift
                      size={26}
                      strokeWidth={1.5}
                      className="animate-bounce"
                    />
                  </div>

                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-brand-copper uppercase mb-3">
                    Exclusive Welcome Gift
                  </span>

                  <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest mb-4 leading-tight tracking-tight">
                    You&apos;ve unlocked <br />
                    <span className="text-brand-copper italic font-normal">
                      10% off
                    </span>{" "}
                    your order.
                  </h2>

                  <p className="text-brand-forest/70 text-sm sm:text-base mb-8 max-w-sm leading-relaxed">
                    Start your copper water ritual. .
                  </p>

                  <div className="w-full flex flex-col gap-3">
                    <button
                      onClick={() => handleChoice("claimed")}
                      className="w-full bg-brand-copper hover:bg-brand-copper/90 text-white rounded-xl py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-[1.01] cursor-pointer shadow-md shadow-brand-copper/15"
                    >
                      Claim My 10% Discount
                    </button>

                    <button
                      onClick={() => handleChoice("full_price")}
                      className="w-full bg-transparent hover:bg-brand-forest/5 text-brand-forest/70 hover:text-brand-forest rounded-xl py-4 text-xs sm:text-sm font-semibold tracking-wider transition-all border border-divider cursor-pointer"
                    >
                      No, I want to purchase at full price
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-forest/10 border border-brand-forest/20 flex items-center justify-center text-brand-forest mb-6 shadow-[0_0_30px_rgba(15,43,37,0.15)]">
                    <Check size={28} />
                  </div>

                  <h3 className="text-2xl font-serif text-brand-forest mb-3">
                    {chosenOption === "claimed"
                      ? "Discount Secured!"
                      : "Preference Recorded!"}
                  </h3>

                  <p className="text-brand-forest/60 text-sm max-w-xs leading-relaxed font-sans">
                    {chosenOption === "claimed"
                      ? "We've registered your 10% launch discount. Enjoy your premium copper experience."
                      : "Thank you for supporting the craft at full value. We've noted your preference for launch."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiscountModal;
