"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LiaTimesSolid, LiaBarsSolid } from "react-icons/lia";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ROSTER", href: "roster" },
    { name: "COACHES", href: "coaches" },
    { name: "CALENDAR", href: "calendar" },
    { name: "SCHEDULE", href: "schedule" },
    { name: "STADIUM", href: "stadium" },
    { name: "HISTORY", href: "history" },
    { name: "MEDIA", href: "media" },
    { name: "SHOP", href: "https://football.1stplacespiritwear.com/sites/OH/Dublin/Dublin%20Scioto%20High%20School" },
    { name: "LINKS", href: "links" },
    { name: "CONTACT", href: "contact" },
  ];

  return (
    <nav>
      <div className="flex justify-center items-center h-16 md:h-12 bg-white text-black relative font-oswald text-center">
        <div className="flex justify-between items-center w-[65%]">
          <Link href="/">
            <div className="flex flex-row justfy-center items-center space-x-4">
              <img src="/images/logo.png" alt="logo" className="h-8 w-8" />
              <h1 className="text-2xl font-normal font-oswald text-[#014321]">
                SCIOTO FOOTBALL
              </h1>
            </div>
          </Link>
          <h2 className="hidden md:block text-lg font-normal text-[#014321]">
            TRUST - COMMITMENT - LOVE - BELIEF
          </h2>
          <div className="md:hidden flex items-center">
            <button onClick={handleMenu} className="text-3xl text-[#014321]">
              {isOpen ? <LiaTimesSolid /> : <LiaBarsSolid />}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center h-14 bg-[#014321] text-white relative">
        <div className="flex justify-between items-center w-[80%] lg:w-[70%] gap-6">
          <div className="flex space-x-4 font-oswald flex-wrap justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-normal hover:text-gray-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/dshsirishfootball/"
              className="text-2xl md:text-4xl font-normal hover:text-gray-400 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/groups/Sciotofootball/"
              className="text-2xl md:text-4xl font-normal hover:text-gray-400 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/sciotofootball"
              className="text-2xl md:text-4xl font-normal hover:text-gray-400 transition-colors duration-300"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden z-50 fixed top-0 w-screen h-screen bg-[#014321] text-white text-center transition-all ease-in-out duration-300 ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="flex w-full justify-end items-center">
          <button onClick={handleMenu} className="text-3xl text-white p-4">
            {isOpen ? <LiaTimesSolid /> : <LiaBarsSolid />}
          </button>
        </div>
        <div className="flex flex-col items-center justify- h-screen">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-normal font-oswald hover:text-green-950 transition-colors duration-300 pb-9 sm:pb-10"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
