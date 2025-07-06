import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, Github, Package, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/theme-toggle';
import { COMPONENT_CATEGORIES } from '@/lib/components-data';

interface DocsLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  type: 'page' | 'separator' | 'category';
  components?: string[];
}

const navigation: NavigationItem[] = [
  { name: 'Getting Started', href: '/docs', type: 'page' },
  { name: 'Installation', href: '/docs/installation', type: 'page' },
  { name: 'Theming', href: '/docs/theming', type: 'page' },
  { name: 'Components', href: '#', type: 'separator' },
  ...COMPONENT_CATEGORIES.map(category => ({
    name: category.name,
    href: `/docs/components/${category.id}`,
    type: 'category' as const,
    components: category.components
  }))
];

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/docs' && location === '/docs') return true;
    if (href !== '/docs' && location.startsWith(href)) return true;
    return false;
  };

  const filteredNavigation = navigation.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Sidebar = () => (
    <div className="w-64 h-full border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">DelightPlus UI</span>
          <Badge variant="secondary" className="text-xs">v0.1.7</Badge>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <nav className="space-y-2">
          {filteredNavigation.map((item) => (
            <div key={item.name}>
              {item.type === 'separator' ? (
                <div className="pt-4 pb-2">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.name}
                  </h4>
                </div>
              ) : item.type === 'category' ? (
                <div>
                  <Link href={item.href}>
                    <div className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
                      isActive(item.href) 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}>
                      {item.name}
                      {item.components && (
                        <Badge variant="outline" className="ml-auto text-xs">
                          {item.components.length}
                        </Badge>
                      )}
                    </div>
                  </Link>
                  {isActive(item.href) && item.components && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.components.map((component: string) => (
                        <Link key={component} href={`/docs/components/${component}`}>
                          <div className={`px-3 py-1 text-sm rounded-md transition-colors cursor-pointer capitalize ${
                            location === `/docs/components/${component}`
                              ? 'bg-accent text-accent-foreground'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}>
                            {component.replace('-', ' ')}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href}>
                  <div className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
                    isActive(item.href) 
                      ? 'bg-accent text-accent-foreground' 
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}>
                    {item.name}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/DeLightPlus/delightplus-ui" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://npmjs.com/package/delightplus-ui" target="_blank" rel="noopener noreferrer">
                <Package className="h-4 w-4 mr-2" />
                npm
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4 lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link href="/docs">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Package className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">DelightPlus UI</span>
                <Badge variant="secondary" className="text-xs lg:inline-flex hidden">v0.1.7</Badge>
              </div>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 lg:ml-64">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}