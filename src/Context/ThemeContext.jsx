import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => Cookies.get('theme') || 'light');

  useEffect(() => {
    // Apply the theme class to the root element
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);

    // Save theme in cookies
    Cookies.set('theme', theme, { expires: 30 }); // 30 days
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
