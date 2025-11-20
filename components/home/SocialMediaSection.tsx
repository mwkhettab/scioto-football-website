"use client";
import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaArrowRight } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaSection: React.FC = () => {
  return (
    <div className="flex flex-col w-full py-16 bg-white text-[#014321]">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-oswald text-[#014321] text-center mb-4">
          WHAT'S NEW
        </h2>
        <p className="text-center text-lg font-oswald text-[#014321] mb-12">
          Stay updated with the latest news and events by following us on social
          media.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="https://www.instagram.com/dshsirishfootball"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#014321] shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-48 bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center">
              <FaInstagram className="text-white text-5xl opacity-90" />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-oswald text-white mb-2">
                Instagram
              </h3>

              <p className="inline-flex items-center text-white font-oswald transition-colors">
                Follow Us <FaArrowRight className="ml-2" />
              </p>
            </div>
          </Link>

          <Link
            href="https://x.com/sciotofootball"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#014321] shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-48 bg-black flex items-center justify-center">
              <FaXTwitter className="text-white text-5xl opacity-90" />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-oswald text-white mb-2">
                Twitter
              </h3>

              <p className="inline-flex items-center text-white font-oswald transition-colors">
                Follow Us <FaArrowRight className="ml-2" />
              </p>
            </div>
          </Link>

          <Link
            href="https://www.facebook.com/groups/Sciotofootball/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#014321] shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-48 bg-[#1877F2] flex items-center justify-center">
              <FaFacebookF className="text-white text-5xl opacity-90" />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-oswald text-white mb-2">
                Facebook
              </h3>

              <p className="inline-flex items-center text-white font-oswald transition-colors">
                Join Group <FaArrowRight className="ml-2" />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSection;
