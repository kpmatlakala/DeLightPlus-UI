import { Link } from 'wouter';
import { Package, Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '@/components/theme-toggle';

export default function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Components', href: '/docs/components/forms' },
    { name: 'Installation', href: '/docs/installation' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <span className="text-xl font-bold">DelightPlus UI</span>
                <Badge variant="secondary" className="ml-2 text-xs">v0.1.7</Badge>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="text-sm font-medium transition-colors hover:text-primary cursor-pointer">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/DeLightPlus/delightplus-ui" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://npmjs.com/package/delightplus-ui" target="_blank" rel="noopener noreferrer">
                <Package className="h-4 w-4 mr-2" />
                npm
              </a>
            </Button>
          </div>
          
          <ThemeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span 
                        className="block px-3 py-2 text-base font-medium transition-colors hover:text-primary cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="https://github.com/DeLightPlus/delightplus-ui" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="https://npmjs.com/package/delightplus-ui" target="_blank" rel="noopener noreferrer">
                        <Package className="h-4 w-4 mr-2" />
                        npm
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}