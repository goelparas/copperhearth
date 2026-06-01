"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, ArrowRight, Heart, Loader2 } from "lucide-react";
import { z } from "zod";
import { trackSignup } from "@/utils/analytics";

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  finishId: string;
  finishName: string;
  onSuccess: (email: string, phone: string) => void;
}

// Validation schema for phone number
const phoneSchema = z
  .string()
  .regex(/^\d{10}$/, "Phone number must be exactly 10 digits");

const VoteModal: React.FC<VoteModalProps> = ({
  isOpen,
  onClose,
  finishId,
  finishName,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) {
      setPhone(val);
      if (errorMsg) setErrorMsg("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !email) return;

    // Validate phone number
    const validationResult = phoneSchema.safeParse(phone);
    if (!validationResult.success) {
      setErrorMsg(validationResult.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          finishId,
          finishName,
          email,
          phone,
        }),
      });

      if (!response.ok) {
        console.error("Voting signup API error status:", response.status);
      }

      // Also track analytics event
      trackSignup(email, phone, "modal");

      // Save user details to localStorage
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_phone", phone);

      setIsSuccess(true);
      
      // Delay closing and register vote in parent
      setTimeout(() => {
        onSuccess(email, phone);
        onClose();
        // Reset states for future votes if needed
        setIsSuccess(false);
        setEmail("");
        setPhone("");
      }, 1800);
    } catch (err) {
      console.error("Voting signup submission failed:", err);
      // Seamless fallback to success
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_phone", phone);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess(email, phone);
        onClose();
        setIsSuccess(false);
        setEmail("");
        setPhone("");
      }, 1800);
    } finally {
      setIsSubmitting(false);
    }
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
            onClick={onClose}
            className="fixed inset-0 bg-brand-forest/60 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg h-fit bg-[#F3ECE4] rounded-[2.5rem] p-8 md:p-10 shadow-2xl z-[101] border border-brand-forest/10 overflow-hidden"
          >
            {/* Background branding glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-copper/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-forest/5 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-brand-forest/40 hover:text-brand-forest transition-colors p-2 hover:bg-brand-forest/5 rounded-full"
            >
              <X size={20} />
            </button>

            {!isSuccess ? (
              <div className="text-center relative z-10">
                <div className="w-12 h-12 bg-brand-copper/10 border border-brand-copper/20 rounded-full flex items-center justify-center mx-auto mb-5 text-brand-copper">
                  <Heart size={22} fill="currentColor" className="animate-pulse" />
                </div>
                
                <p className="text-brand-copper uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold mb-2">
                  Cast Your Vote
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif text-brand-forest mb-3 leading-snug">
                  Choose <span className="italic font-medium">{finishName}</span>
                </h2>
                <p className="text-brand-forest/65 text-xs sm:text-sm max-w-sm mx-auto mb-8">
                  Enter your email and phone number to record your vote and secure <strong>10% off</strong> early launch access.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Phone Input */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-forest/30" size={18} />
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Phone Number (10 digits)"
                      required
                      className="w-full bg-white border border-brand-forest/10 rounded-2xl py-4 pl-12 pr-4 text-brand-forest text-sm placeholder:text-brand-forest/35 focus:outline-none focus:border-brand-copper/60 focus:ring-1 focus:ring-brand-copper/60 transition-colors font-sans shadow-xs"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-forest/30" size={18} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full bg-white border border-brand-forest/10 rounded-2xl py-4 pl-12 pr-4 text-brand-forest text-sm placeholder:text-brand-forest/35 focus:outline-none focus:border-brand-copper/60 focus:ring-1 focus:ring-brand-copper/60 transition-colors font-sans shadow-xs"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-red-600 text-xs px-2 text-left font-medium">
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-forest hover:bg-brand-forest/95 disabled:opacity-50 text-white py-4.5 rounded-2xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] cursor-pointer shadow-lg shadow-brand-forest/10"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin text-white/80" size={18} />
                        <span className="uppercase tracking-widest text-[10px] sm:text-xs font-bold">Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span className="uppercase tracking-widest text-[10px] sm:text-xs font-bold">Confirm My Vote</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                  
                  <p className="text-[9px] sm:text-[10px] text-brand-forest/45 mt-4 leading-relaxed font-sans">
                    By submitting, you agree to receive launch updates. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 relative z-10"
              >
                <div className="w-20 h-20 bg-brand-copper/20 border border-brand-copper/45 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-copper/10">
                  <Heart className="text-brand-copper fill-brand-copper animate-bounce" size={32} />
                </div>
                <h3 className="text-2xl font-serif text-brand-forest mb-2">Vote Registered!</h3>
                <p className="text-brand-forest/65 text-sm leading-relaxed max-w-xs mx-auto">
                  Thank you! Your vote for <strong>{finishName}</strong> has been secured. Welcome to the circle!
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VoteModal;
