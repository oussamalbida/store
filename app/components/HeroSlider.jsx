'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000',
    title: 'Sale! Up to 20% off!',
    subtitle: 'Man Cave Essentials Sale',
    buttonText: 'SHOP NOW',
    buttonLink: '/shop',
    color: 'bg-yellow-400'
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000',
    title: 'New Collection',
    subtitle: 'Spring Fashion Trends',
    buttonText: 'DISCOVER',
    buttonLink: '/shop',
    color: 'bg-pink-400'
  },
  {
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000',
    title: 'Limited Edition',
    subtitle: 'Exclusive Designer Pieces',
    buttonText: 'EXPLORE',
    buttonLink: '/shop',
    color: 'bg-purple-400'
  }
];

const fadeVariants = {
  enter: {
    opacity: 0,
    scale: 1.1
  },
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 0.9
  }
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

const buttonVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.4,
    transition: {
      duration: 0.8
    }
  }
};

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const navigate = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 1.2 }
          }}
          className="absolute w-full h-full"
          style={{
            backgroundImage: `url(${slides[currentIndex].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            className={`${slides[currentIndex].color} mix-blend-multiply absolute inset-0`}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentIndex}`}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-6xl md:text-7xl font-bold mb-4"
              >
                {slides[currentIndex].title}
              </motion.h1>
              <motion.p
                key={`subtitle-${currentIndex}`}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-xl md:text-2xl mb-8"
              >
                {slides[currentIndex].subtitle}
              </motion.p>
              <motion.div
                key={`button-${currentIndex}`}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Link href={slides[currentIndex].buttonLink}>
                  <span className="inline-block px-8 py-3 bg-white text-gray-900 rounded-full font-medium text-lg shadow-lg">
                    {slides[currentIndex].buttonText}
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1, opacity: 0.9 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-white"
        onClick={() => navigate((currentIndex - 1 + slides.length) % slides.length)}
      >
        ←
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1, opacity: 0.9 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-white"
        onClick={() => navigate((currentIndex + 1) % slides.length)}
      >
        →
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => navigate(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50'
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
}
