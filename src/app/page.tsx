"use client";

import { motion } from "framer-motion";
import { Button, Card, Input } from "delightplus-ui";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
// import Stats from "@/components/Stats";
// import Testimonials from "@/components/Testimonials";
// import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <HeroSection />
      <Features />
      {/* <Stats />
      <Testimonials />
      <Footer /> */}
    </main>
  );
}
