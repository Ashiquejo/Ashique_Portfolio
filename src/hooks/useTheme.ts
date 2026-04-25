import { useState, useEffect } from "react";

// Maintain a singleton global state for the theme
let globalIsLight = false;
const listeners = new Set<(isLight: boolean) => void>();

export function useTheme() {
  const [isLight, setIsLight] = useState(globalIsLight);

  useEffect(() => {
    listeners.add(setIsLight);
    return () => {
      listeners.delete(setIsLight);
    };
  }, []);

  const toggleTheme = () => {
    globalIsLight = !globalIsLight;
    listeners.forEach((listener) => listener(globalIsLight));
    
    // Toggle the core CSS class driving theme adjustments
    if (globalIsLight) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return { isLight, toggleTheme };
}
