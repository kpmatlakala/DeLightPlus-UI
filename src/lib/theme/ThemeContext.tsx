import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ThemeName = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemeName;
  resolvedTheme: "light" | "dark";
  actualTheme: "light" | "dark"; // alias for resolvedTheme (compat)
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeAttribute(theme: ThemeName) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const resolved = theme === "system" ? getSystemTheme() : theme;
  root.setAttribute("data-theme", resolved);
  // Also mirror as class names for compatibility with apps using .light/.dark selectors
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
}

export function ThemeProvider({ children, defaultTheme = "system" as ThemeName, storageKey = "dlp-theme" }: { children: React.ReactNode; defaultTheme?: ThemeName; storageKey?: string }) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next);
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, next);
      }
    } catch {}
  }, [storageKey]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev: ThemeName) => {
      const currentResolved = prev === "system" ? getSystemTheme() : prev;
      return currentResolved === "dark" ? "light" : "dark";
    });
  }, []);

  const resolvedTheme = useMemo(() => (theme === "system" ? getSystemTheme() : theme), [theme]);

  useEffect(() => {
    // Load stored theme on mount
    try {
      const stored = typeof localStorage !== "undefined" ? (localStorage.getItem(storageKey) as ThemeName | null) : null;
      if (stored) setThemeState(stored);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    applyThemeAttribute(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyThemeAttribute("system");
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [theme]);

  const value: ThemeContextValue = useMemo(
    () => ({ theme, resolvedTheme, actualTheme: resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}


