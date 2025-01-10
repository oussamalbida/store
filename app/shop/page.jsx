'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import PageLayout from '../components/PageLayout';

const categories = ['All', 'Clothing', 'Accessories', 'Shoes', 'Bags', 'Electronics', 'Sports', 'Home'];
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
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf8b7f',
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
  },
  {
    id: 9,
    name: 'Smart Watch',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    description: 'Advanced smartwatch with health monitoring features',
    colors: ['Black', 'Silver', 'Gold'],
    rating: 4.8,
    reviews: 342
  },
  {
    id: 10,
    name: 'Wireless Earbuds',
    price: 159.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
    description: 'Premium wireless earbuds with noise cancellation',
    colors: ['White', 'Black', 'Navy'],
    rating: 4.6,
    reviews: 278
  },
  {
    id: 11,
    name: 'Yoga Mat',
    price: 49.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f',
    description: 'Professional-grade yoga mat with superior grip',
    colors: ['Purple', 'Green', 'Maroon'],
    rating: 4.7,
    reviews: 156
  },
  {
    id: 12,
    name: 'Coffee Maker',
    price: 199.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6',
    description: 'Programmable coffee maker with built-in grinder',
    colors: ['Dark Gray', 'Brown'],
    rating: 4.9,
    reviews: 203
  },
  {
    id: 13,
    name: 'Leather Wallet',
    price: 79.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
    description: 'Handcrafted leather wallet with RFID protection',
    colors: ['Brown', 'Black', 'Tan'],
    rating: 4.8,
    reviews: 167
  },
  {
    id: 14,
    name: 'Desk Lamp',
    price: 129.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c',
    description: 'Modern LED desk lamp with wireless charging',
    colors: ['Silver', 'Black', 'White'],
    rating: 4.7,
    reviews: 143
  },
  {
    id: 15,
    name: 'Hiking Backpack',
    price: 149.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887',
    description: 'Professional hiking backpack with hydration system',
    colors: ['Olive', 'Black', 'Brown'],
    rating: 4.9,
    reviews: 218
  }
];

export default function Shop() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, []);

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

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#0f111700]">
        {/* Banner Section */}
        <div className="w-[125%] h-[500px] ml-[-150px] mb-[50px] mt-[-100px] relative bg-[#0f1117] py-16 mb-8">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Grab up to 50% off on
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-400 mb-6">
                  Selected Products
                </h2>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Buy Now
                </button>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-[300px] md:h-[380px]">
                  <Image
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"
                    alt="Shop Banner"
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto pb-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'bg-[#1a1d24] text-gray-400 hover:bg-[#22262f]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
            <div className="ml-auto">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="px-6 py-3 rounded-full text-sm font-medium bg-[#1a1d24] text-gray-400 hover:bg-[#22262f] focus:outline-none cursor-pointer appearance-none"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option} className="bg-[#1a1d24]">{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="group relative bg-[#1a1d24] rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300"
              >
                <Link href={`/shop/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-white group-hover:text-pink-500 transition-colors duration-300 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-pink-500 text-2xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-[#282c35]'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="w-[calc(100%-3rem)] absolute bottom-6 left-6 py-3 bg-pink-500 text-white rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                currentPage === 1
                  ? 'bg-[#1a1d24] text-gray-600 cursor-not-allowed'
                  : 'bg-[#1a1d24] text-gray-400 hover:bg-pink-500 hover:text-white'
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    page === currentPage
                      ? 'bg-pink-500 text-white'
                      : 'bg-[#1a1d24] text-gray-400 hover:bg-pink-500 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                currentPage === totalPages
                  ? 'bg-[#1a1d24] text-gray-600 cursor-not-allowed'
                  : 'bg-[#1a1d24] text-gray-400 hover:bg-pink-500 hover:text-white'
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
