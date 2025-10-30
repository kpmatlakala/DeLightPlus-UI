"use client";

import { Button, Card, Container } from "delightplus-ui";
import Link from "next/link";

export default function Home() {
  return (
    <Container  className="min-w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-sky-500 to-pink-600 text-white">
      <Card className="p-8 bg-white/10 backdrop-blur-lg text shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to DeLightPlus UI Starter ✨</h1>
        <p className="text-sm mb-6 text-gray-200">
          Start building beautiful interfaces and stunning apps with DeLightPlus UI and Next.js
        </p>

        <Button 
          className="text-black shadow-lg"             
          variable="outline"
          onClick={() => alert("Clicked!")}
        >         
          Get Started          
        </Button> 

      </Card>

      <footer className="text-sm text-gray-100 text-center">
        <p>
          Built with <a href="https://nextjs.org" className="underline">Next.js</a> and <a href="https://tailwindcss.com" className="underline">Tailwind CSS</a>.
        </p>
      </footer>
    </Container>
  );
}
