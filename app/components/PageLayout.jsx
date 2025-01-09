'use client';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function PageLayout({ children, title, subtitle }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="pt-[120px] min-h-screen"
    >
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-bold mb-4 dark:text-white"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </motion.div>
  );
}
