'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from 'framer-motion';
import HeroSlider from "./components/HeroSlider";
import CategorySlider from "./components/CategorySlider";
import ProductSlider from "./components/ProductSlider";

const featuredProducts = [
  {
    id: 1,
    name: 'Green Knit Sweater',
    description: 'Cozy knitwear essential.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
    hoverImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&q=80&w=800&flip=h'
  },
  {
    id: 2,
    name: 'Classic Tote Bag',
    description: 'Spacious and durable carry-all.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d',
    hoverImage: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&q=80&w=800&flip=v'
  },
  {
    id: 3,
    name: 'Classic Ceramic Vase',
    description: 'Artisan-made home decor.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
    hoverImage: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&q=80&w=800&flip=h'
  },
  {
    id: 4,
    name: 'Urban Traveler Backpack',
    description: 'Durable and stylish backpack.',
    price: 29,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    hoverImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&q=80&w=800&flip=v'
  }
];

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.main 
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Slider */}
      <motion.section
        variants={sectionVariants}
      >
        <HeroSlider />
      </motion.section>

      {/* Featured Products */}
      <motion.section 
        className="w-[90%] mt-[100px] max-w-[1200px] mx-auto mb-16"
        variants={sectionVariants}
      >
        <motion.h2 
          className="text-2xl font-bold mb-8 text-gray-900 dark:text-white"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Products
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg group shadow-lg hover:shadow-xl transition-all duration-300"
              variants={sectionVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative aspect-square mb-4 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} alternate view`}
                  fill
                  className="object-cover absolute inset-0 opacity-0 scale-110 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
                />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 dark:text-white">${product.price}</span>
                <motion.button 
                  className="px-4 py-2 text-sm text-pink-500 dark:text-pink-400 border border-pink-500 dark:border-pink-400 rounded-full hover:bg-pink-500 dark:hover:bg-pink-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Categories Slider */}
        <motion.div 
          className="mt-20 -mx-[calc((100vw-90%)/2)] w-screen"
          variants={sectionVariants}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
          }}
          initial={{ opacity: 0, y: 30 }}
        >
          <CategorySlider />
        </motion.div>

        {/* New Products */}
        <motion.div
          variants={sectionVariants}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
          }}
          initial={{ opacity: 0, y: 30 }}
        >
          <ProductSlider />
        </motion.div>
      </motion.section>
    </motion.main>
  );
};

export default Home;