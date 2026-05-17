"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo-2.png";
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
      <div className="flex justify-between items-center w-full h-16 overflow-hidden px-4">
        {/* Logo */}
        <div className=" md:hidden" />
        <Link href="/" className="flex items-center cursor-pointer  h-full">
          <Image src={logo} alt="Copper Hearth" width={100} priority />
        </Link>
        <div className="flex items-center" />
      </div>
    </nav>
  );
};

export default Navbar;
