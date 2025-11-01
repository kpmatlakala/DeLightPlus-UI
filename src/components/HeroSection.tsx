"use client";

import { motion } from "framer-motion";
import { Button } from "delightplus-ui";

export default function HeroSection() {
  return (
    <section className="max-w-5xl mx-auto text-center py-24 px-6">
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        DeLight<span className="text-primary">+</span>UI
      </motion.h1>

      <motion.p
        className="text-lg text-muted-foreground mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Elegantly crafted React components. Inspired by excellence.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Button size="lg" className="px-8">
          Explore Components
        </Button>
        <Button variant="outline" size="lg" className="px-8">
          Get Started
        </Button>
      </motion.div>
    </section>
  );
}
