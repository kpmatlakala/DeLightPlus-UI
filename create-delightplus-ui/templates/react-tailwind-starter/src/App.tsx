import { Button, Card, Container } from "delightplus-ui";
import { Link } from "wouter";

export default function App() {
  return (
    <Container width="full" className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-500 to-pink-600">
    <Card className="p-10 md:p-16 bg-white/10 backdrop-blur-lg text-center shadow-2xl rounded-xl max-w-lg w-full">
     
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to DelightPlus UI ✨
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-100">
          Build modern, beautiful interfaces faster with DelightPlus components and Tailwind CSS.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" className="text-lg">
            <Link href="/get-started">Get Started</Link>
          </Button>
          <Button variant="outline" className="text-lg">
            <Link href="/docs">Documentation</Link>
          </Button>
        </div>
      </Card>
    </Container>
  );
}
