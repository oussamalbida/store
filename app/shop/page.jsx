'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import PageLayout from '../components/PageLayout';

const categories = ['All', 'Clothing', 'Accessories', 'Shoes', 'Bags'];
const sortOptions = ['Latest', 'Price: Low to High', 'Price: High to Low', 'Popular'];

const products = [
  {
    id: 1,
    name: 'Minimalist Watch',
    price: 149.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    description: 'Elegant minimalist watch with leather strap',
    colors: ['Black', 'Brown', 'Navy'],
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'Leather Backpack',
    price: 89.99,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7',
    description: 'Durable leather backpack with multiple compartments',
    colors: ['Brown', 'Black', 'Tan'],
    rating: 4.8,
    reviews: 95
  },
  {
    id: 3,
    name: 'Classic Sneakers',
    price: 79.99,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
    description: 'Comfortable classic sneakers for everyday wear',
    colors: ['White', 'Black', 'Gray'],
    rating: 4.6,
    reviews: 156
  },
  {
    id: 4,
    name: 'Denim Jacket',
    price: 129.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531',
    description: 'Classic denim jacket with modern fit',
    colors: ['Blue', 'Black', 'Light Blue'],
    rating: 4.7,
    reviews: 82
  },
  {
    id: 5,
    name: 'Crossbody Bag',
    price: 59.99,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1598532213069-bc8f8557c72b',
    description: 'Stylish crossbody bag for everyday essentials',
    colors: ['Black', 'Brown', 'Red'],
    rating: 4.4,
    reviews: 73
  },
  {
    id: 6,
    name: 'Running Shoes',
    price: 119.99,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: 'High-performance running shoes with cushioning',
    colors: ['Black/Red', 'Blue/White', 'Gray/Yellow'],
    rating: 4.9,
    reviews: 204
  },
  {
    id: 7,
    name: 'Sunglasses',
    price: 89.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    description: 'UV protection sunglasses with polarized lenses',
    colors: ['Black', 'Tortoise', 'Gold'],
    rating: 4.3,
    reviews: 167
  },
  {
    id: 8,
    name: 'Wool Sweater',
    price: 99.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    description: 'Warm wool sweater with classic design',
    colors: ['Gray', 'Navy', 'Burgundy'],
    rating: 4.7,
    reviews: 91
  }
];

export default function Shop() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Latest');

  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (selectedSort) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Popular':
          return b.reviews - a.reviews;
        default:
          return b.id - a.id; // Latest
      }
    });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <PageLayout 
      title="Shop Collection" 
      subtitle="Discover our curated collection of premium products"
    >
      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="space-y-2">
          <h3 className="font-medium dark:text-white">Category</h3>
          <div className="flex gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium dark:text-white">Sort By</h3>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group"
          >
            <Link href={`/shop/${product.id}`}>
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full text-sm font-medium shadow-lg"
                >
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToCart(product)}
                  className="absolute top-4 right-4 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <FiPlus className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${product.price}
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
