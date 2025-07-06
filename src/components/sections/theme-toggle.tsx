import { Moon, Sun, Terminal } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`relative p-2 rounded-full transition-all duration-300 ${
        theme === 'light'
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          : 'bg-green-900/20 hover:bg-green-900/30 text-green-400 border border-green-500/30'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={18} />
      ) : (
        <Terminal size={18} className="animate-pulse" />
      )}
    </button>
  );
}