"use client";

import React, { useState } from "react";
import {
  Gift,
  Phone,
  Mail,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import {
  trackInteraction,
  trackLeadAttempt,
  trackLeadError,
  trackSignup,
} from "@/utils/analytics";

// Zod schema for 10-digit phone number validation
const phoneSchema = z
  .string()
  .regex(/^\d{10}$/, "Phone number must be exactly 10 digits");

const PrelaunchSignup = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Allow only digits, max 10 characters
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) {
      setPhone(val);
      // Clear validation error when typing
      if (errorMsg) setErrorMsg("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !email) return;

    // Validate phone number with Zod
    const validationResult = phoneSchema.safeParse(phone);
    if (!validationResult.success) {
      setErrorMsg(validationResult.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    trackLeadAttempt("inline");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, email, source: "prelaunch_signup" }),
      });

      if (!response.ok) {
        trackLeadError("inline", response.status);
        console.error("Prelaunch signup API error status:", response.status);
      } else {
        trackSignup("inline");
      }
      
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_phone", phone);
      setIsSuccess(true);
    } catch (err) {
      console.error("Prelaunch signup request failed:", err);
      trackLeadError("inline", "request_failed");
      // Fallback to showing success to the user to keep the UX seamless
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_phone", phone);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup" className="py-6">
      <div className="container mx-auto px-6 max-w-[75rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => {
            trackInteraction("section_view", { section: "signup" });
          }}
          className="bg-brand-forest rounded-3xl md:rounded-[4rem] p-8 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12 border border-white/5"
        >
          {/* Left Content: Icon & Messaging */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center text-brand-copper shrink-0 shadow-[0_0_50px_rgba(184,115,51,0.05)]">
              <Gift size={32} />
            </div>
            <div className="max-w-md">
              <p className="text-white/30 text-[0.625rem] md:text-xs font-sans uppercase tracking-[0.3em] mb-3 font-bold">
                Be the first to own it.
              </p>
              <h2 className="text-2xl md:text-5xl font-serif text-white leading-[1.2] md:leading-tight">
                Join early & get{" "}
                <span className="text-brand-copper italic font-medium">
                  10% off
                </span>{" "}
                at launch.
              </h2>
            </div>
          </div>

          {/* Right Content: Signup Form / Success Card */}
          <div className="w-full lg:max-w-md">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full p-8 bg-white/5 border border-white/10 rounded-[2rem] text-center flex flex-col items-center gap-5 shadow-2xl backdrop-blur-sm"
              >
                <div className="w-16 h-16 rounded-full bg-brand-copper/20 border border-brand-copper/40 flex items-center justify-center text-brand-copper shadow-[0_0_30px_rgba(184,115,51,0.2)]">
                  <Check size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">
                    Welcome to the Circle
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-sans">
                    Thank you for joining our collection!<br />
                    We&apos;ve reserved your 10% launch discount.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
              >
                {/* Phone Input */}
                <div className="relative flex items-center rounded-[1.125rem] md:rounded-[1.375rem] border border-white/10 bg-white/5 focus-within:border-brand-copper/40 focus-within:bg-white/[0.08] transition-all">
                  <Phone className="absolute left-5 text-white/30" size={18} />
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Phone Number (10 digits)"
                    required
                    className="w-full bg-transparent pl-12 pr-5 py-4 md:py-5 text-white text-[0.875rem] placeholder:text-white/20 focus:outline-none transition-all font-sans"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>

                {/* Email Input */}
                <div className="relative flex items-center rounded-[1.125rem] md:rounded-[1.375rem] border border-white/10 bg-white/5 focus-within:border-brand-copper/40 focus-within:bg-white/[0.08] transition-all">
                  <Mail className="absolute left-5 text-white/30" size={18} />
                  <input
                    type="email"
                    id="prelaunch-email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-transparent pl-12 pr-5 py-4 md:py-5 text-white text-[0.875rem] placeholder:text-white/20 focus:outline-none transition-all font-sans"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-xs px-2 font-medium font-sans">
                    {errorMsg}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-copper hover:bg-brand-copper/90 disabled:opacity-50 text-white rounded-[1.125rem] md:rounded-[1.375rem] py-4 md:py-5 text-[0.625rem] md:text-[0.8125rem] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-copper/10"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Join the Collection</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrelaunchSignup;
