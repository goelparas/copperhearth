"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import logo from '../../public/logo.png'
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-10 w-full z-50 transition-all duration-300 h-[72px] md:h-[88px] flex items-center ${isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">

          <Image
            src={logo}
            alt="Copper Heritage"
            objectFit="contain"
            className="relative w-32 h-10 md:w-44 md:h-12"
            priority
          />

        </Link>

        {/* Cart Icon Only */}
        <div className="flex items-center">
          <button className="text-foreground hover:text-brand-copper transition-colors p-2">
            <ShoppingBag size={24} strokeWidth={1.2} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
