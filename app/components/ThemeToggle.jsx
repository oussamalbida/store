'use client';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: darkMode ? 360 : 0,
          scale: darkMode ? 1 : 0,
          opacity: darkMode ? 1 : 0,
          position: 'absolute',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%'
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FiMoon className="w-5 h-5 text-yellow-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: darkMode ? 0 : 360,
          scale: darkMode ? 0 : 1,
          opacity: darkMode ? 0 : 1,
          position: 'absolute',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%'
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FiSun className="w-5 h-5 text-yellow-500" />
      </motion.div>
      
      {/* Invisible element to maintain button size */}
      <div className="w-5 h-5 opacity-0">
        <FiSun className="w-5 h-5" />
      </div>
    </motion.button>
  );
}
