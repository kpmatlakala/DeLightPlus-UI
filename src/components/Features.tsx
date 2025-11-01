"use client";
import { motion } from "framer-motion";
import { Card } from "delightplus-ui";
import { Zap, Type, Palette, Moon } from "lucide-react";

const features = [
  { icon: <Zap />, title: "Lightning Fast", text: "Optimized bundles and tree-shaking." },
  { icon: <Type />, title: "TypeScript First", text: "Full IntelliSense and type safety." },
  { icon: <Palette />, title: "Themeable", text: "Design tokens for full customization." },
  { icon: <Moon />, title: "Dark Mode Native", text: "Smooth, flicker-free transitions." },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto py-24 px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <Card className="p-6 text-center hover:shadow-lg transition-all">
            <div className="text-primary mb-4 flex justify-center">{f.icon}</div>
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.text}</p>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
