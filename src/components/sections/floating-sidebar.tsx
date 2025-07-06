import { useState, useEffect } from 'react';
import { Home, User, FolderOpen, Code, Mail, Menu, X, Download } from 'lucide-react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { useTheme } from '@/hooks/use-theme';
import ThemeToggle from '@/components/theme-toggle';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'contact', label: 'Contact', icon: Mail }
];

export default function FloatingSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const activeSection = useScrollSpy(navItems.map(item => item.id));
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsExpanded(false);
  };

  const handleResumeDownload = () => {
    // Create a blob URL for the resume download
    const link = document.createElement('a');
    link.href = '/resume/Mr-Kabelo-Peter-Matlakala-Resume.pdf';
    link.download = 'Kabelo_Matlakala_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className={`
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-48' : 'w-14'}
        bg-white/90 dark:bg-black/90 backdrop-blur-md
        border border-slate-200 dark:border-green-500/30
        rounded-2xl shadow-xl dark:shadow-green-500/20
        overflow-hidden
        hover:shadow-2xl dark:hover:shadow-green-500/30
      `}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full h-14 flex items-center justify-center text-slate-700 dark:text-green-400 hover:text-blue-600 dark:hover:text-green-300 transition-colors duration-200"
        >
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Navigation Items */}
        <div className="px-2 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full h-12 mb-1 rounded-xl flex items-center transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-100 dark:bg-green-900/40 text-blue-600 dark:text-green-400 shadow-sm' 
                    : 'text-slate-600 dark:text-green-300 hover:bg-slate-100 dark:hover:bg-green-900/20 hover:text-blue-600 dark:hover:text-green-400'
                  }
                  ${isExpanded ? 'px-3' : 'justify-center'}
                `}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                {isExpanded && (
                  <span className="ml-3 text-sm font-medium opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
          
          {/* Download Resume */}
          <button
            onClick={handleResumeDownload}
            className={`
              w-full h-12 mb-1 rounded-xl flex items-center transition-all duration-200
              text-slate-600 dark:text-green-300 hover:bg-slate-100 dark:hover:bg-green-900/20 hover:text-blue-600 dark:hover:text-green-400
              ${isExpanded ? 'px-3' : 'justify-center'}
            `}
            title={!isExpanded ? 'Download Resume' : undefined}
          >
            <Download size={18} className="flex-shrink-0" />
            {isExpanded && (
              <span className="ml-3 text-sm font-medium opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]">
                Resume
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <div className={`mt-4 pt-4 border-t border-slate-200 dark:border-green-500/30 ${isExpanded ? 'px-3' : 'flex justify-center'}`}>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Floating dots indicator when collapsed */}
      {!isExpanded && (
        <div className="absolute -right-2 top-4 flex flex-col space-y-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-600 dark:bg-green-400 scale-125'
                  : 'bg-slate-300 dark:bg-green-600/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}