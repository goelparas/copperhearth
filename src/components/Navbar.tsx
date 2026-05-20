"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo-2.png";
import CountdownTimer from "./CountdownTimer";

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
      className={`fixed top-10 w-full z-50 transition-all duration-300 flex items-center ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center w-full  overflow-hidden px-4">
        {/* Logo */}
        <div className="w-22 h-22  sm:w-28 sm:h-28">
        <Link href="/" className="flex relative items-center cursor-pointer  h-full w-full">
          <Image src={logo} alt="Copper Hearth"  fill priority objectFit="contain" />
        </Link>
        </div>
        
        <div className="flex items-center justify-end">
          <CountdownTimer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
