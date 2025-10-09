import { useState } from "react";

const useTheme = () => {
  const getInitialTheme = localStorage.getItem('theme') === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  return { isDarkMode, toggleTheme };
};

export default useTheme;