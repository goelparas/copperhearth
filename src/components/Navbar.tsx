"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import logo from '../../public/logo-2.png'
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
      className={`fixed top-10 w-full z-50 transition-all duration-300 flex items-center ${isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="flex justify-between items-center w-full h-16 overflow-hidden px-4">
        {/* Logo */}
        <div className=" md:hidden"/>
        <Link href="/" className="flex items-center cursor-pointer  h-full">
          <Image
            src={logo}
            alt="Copper Heritage"
            width={80}
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
