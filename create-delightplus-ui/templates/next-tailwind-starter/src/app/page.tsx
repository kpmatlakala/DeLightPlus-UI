"use client";

import { Button, Card, Container } from "delightplus-ui";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-sky-500 to-pink-600 text-white">
      <Card className="p-8 bg-white/10 backdrop-blur-lg text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to DelightPlus UI Starter ✨</h1>
        <p className="text-sm mb-6 text-gray-200">
          Build stunning apps with DelightPlus UI and Next.js
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signin">
            <Button radius="full" className="bg-sky-500 hover:bg-sky-600 text-white">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button radius="full" className="bg-white text-sky-600 hover:bg-gray-100">Sign Up</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}
