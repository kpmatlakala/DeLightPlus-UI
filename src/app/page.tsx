// docs/src/app/page.tsx

"use client";

import { Button, Card, Container } from "delightplus-ui"; // adjust paths if needed

export default function Home() {
  return (
    <Container className="min-h-screen flex flex-col items-center justify-center gap-12 bg-gray-800">  
      <Card className="bg-gray-200 p-8">
        <h1 className="text-xl text-gray-600 font-bold mb-4">Welcome to DelightPlus-UI</h1>
        <p className="mb-4 text-sm text-gray-500">
          Start building beautiful interfaces with your own reusable components.
        </p>
        <Button 
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"      
          // variant="custom"
          radius="full"
          onClick={() => alert("Clicked!")}
        >
          Get Started
        </Button>
      </Card>

      <footer className="text-sm text-gray-500 text-center">
        <p>
          Built with <a href="https://nextjs.org" className="underline">Next.js</a> and <a href="https://tailwindcss.com" className="underline">Tailwind CSS</a>.
        </p>
      </footer>
    </Container>
  );
}
