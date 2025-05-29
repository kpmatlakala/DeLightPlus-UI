"use client";

import { Button, Card, Container } from "delightplus-ui";

export default function Home() {
  return (
    <Container className="min-h-screen flex flex-col items-center justify-center gap-12 bg-gray-900 text-gray-100 px-4 py-12">
      <Card className="w-full max-w-md bg-white text-gray-800 p-8 rounded-2xl shadow-2xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight">Welcome to DeLightPlus-UI</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Start building beautiful interfaces with reusable React components.
          </p>
        </header>

        <div className="flex justify-center">
          <Button
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition-transform shadow-lg"
            onClick={() => alert("Clicked!")}
            aria-label="Get Started"
          >
            Get Started
          </Button>
        </div>
      </Card>

      <footer className="text-center text-gray-400 text-xs">
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            className="underline hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            href="https://tailwindcss.com"
            className="underline hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </a>
          .
        </p>
      </footer>
    </Container>
  );
}
