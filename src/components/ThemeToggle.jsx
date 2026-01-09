import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i>
    </button>
  );
};

export default ThemeToggle;