import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-between w-16 h-8 p-1 rounded-full border transition-all duration-300 focus:outline-none cursor-pointer ${
        isDark
          ? 'bg-slate-900/80 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
          : 'bg-amber-100/90 border-amber-300 text-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
      } ${className}`}
    >
      {/* Light Icon */}
      <span className="flex items-center justify-center w-6 h-6 z-10 transition-opacity duration-300">
        <FiSun className={`w-4 h-4 transition-colors ${!isDark ? 'text-amber-500 font-bold' : 'text-slate-500 opacity-60'}`} />
      </span>

      {/* Dark Icon */}
      <span className="flex items-center justify-center w-6 h-6 z-10 transition-opacity duration-300">
        <FiMoon className={`w-4 h-4 transition-colors ${isDark ? 'text-cyan-300 font-bold' : 'text-amber-700/40 opacity-60'}`} />
      </span>

      {/* Sliding Pill Indicator */}
      <motion.div
        className={`absolute top-1 bottom-1 w-6 h-6 rounded-full shadow-md ${
          isDark
            ? 'bg-gradient-to-tr from-cyan-500 to-blue-500'
            : 'bg-gradient-to-tr from-amber-400 to-yellow-300'
        }`}
        initial={false}
        animate={{
          left: isDark ? '34px' : '4px',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}
