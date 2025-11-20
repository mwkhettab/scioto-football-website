"use client";
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import SocialMediaSection from "@/components/home/SocialMediaSection";
import SponsorsSection from "@/components/home/SponsorsSection";
import ContactSection from "@/components/home/ContactSection";
import NewslettersSection from "@/components/home/NewslettersSection";

export default function Home() {
  return (
    <div className="bg-white min-h-screen max-w-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Announcements */}
      <AnnouncementsSection />

      {/* Social Media */}
      <SocialMediaSection />

      {/* Sponsors */}
      <SponsorsSection />

      {/* Newsletters */}
      <NewslettersSection />

      {/* Contact */}
      <ContactSection />
    </div>
  );
}
