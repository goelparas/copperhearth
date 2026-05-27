"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, ArrowRight } from "lucide-react";
import { trackSignup } from "@/utils/analytics";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track the signup event with GA (safely masking the inputs)
    trackSignup(email, phone, "modal");

    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 2000);
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
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-brand-light rounded-3xl p-8 shadow-2xl z-[101] border border-brand-muted"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-brand-dark/40 hover:text-brand-dark transition-colors"
            >
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <div className="text-center">
                <p className="text-brand-accent uppercase tracking-[0.3em] text-xs font-semibold mb-3">Early Access</p>
                <h2 className="text-3xl font-serif text-brand-dark mb-4">Join the Hearth Circle</h2>
                <p className="text-brand-dark/60 mb-8">
                  Get exclusive access to limited editions and wellness insights.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30" size={18} />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      autoComplete="email"
                      className="w-full bg-white border border-brand-muted rounded-xl py-4 pl-12 pr-4 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Phone Number"
                      required
                      autoComplete="tel"
                      className="w-full bg-white border border-brand-muted rounded-xl py-4 pl-12 pr-4 text-brand-dark focus:outline-none focus:border-brand-accent transition-colors"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-dark text-brand-light py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-brand-accent transition-all transform hover:scale-[1.02]"
                  >
                    <span className="uppercase tracking-widest text-xs font-semibold">Access Now</span>
                    <ArrowRight size={18} />
                  </button>
                  <p className="text-[0.625rem] text-brand-dark/40 mt-4">
                    By joining, you agree to receive our wellness updates. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ArrowRight className="text-brand-accent rotate-[-45deg]" size={32} />
                </div>
                <h3 className="text-2xl font-serif text-brand-dark mb-2">Welcome to the Circle</h3>
                <p className="text-brand-dark/60">Your journey to wellness begins now.</p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;
