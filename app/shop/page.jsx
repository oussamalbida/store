'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useProductStore } from '../lib/products'; 
import PageLayout from '../components/PageLayout';

const categories = ['All', 'Watches', 'Electronics', 'Accessories', 'Bags', 'Travel', 'Photography', 'Office'];
const sortOptions = ['Latest', 'Price: Low to High', 'Price: High to Low', 'Popular'];

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white dark:bg-[#1a1d24] rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300"
    >
      <div 
        onClick={() => router.push(`/shop/${product.id}`)}
        className="cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images?.[0] || product.image || 'https://via.placeholder.com/400'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-white group-hover:text-pink-500 transition-colors duration-300 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
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
                    className={i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-200 dark:text-[#282c35]'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-500 text-sm">
                ({product.reviews || 0})
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {product.colors?.map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
      <motion.button
        onClick={handleAddToCart}
        className="w-[calc(100%-3rem)] absolute bottom-6 left-6 py-3 bg-pink-500 text-white rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
};

export default function Shop() {
  const { products, init } = useProductStore();
  
  useEffect(() => {
    init();
  }, [init]);

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

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' ? true : product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Popular':
        return (b.reviews || 0) - (a.reviews || 0);
      default: // Latest
        return b.id - a.id;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageLayout>
      <div className="min-h-screen  dark:bg-[#0f111700]">
        {/* Banner Section */}
        <div className="w-[125%] h-[400px] ml-[-150px] mb-[50px] mt-[-100px] relative bg-gray-100 dark:bg-[#0f1117] py-16 mb-8">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Grab up to 50% off on
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-600 dark:text-gray-400 mb-6">
                  Selected Products
                </h2>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Buy Now
                </button>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-[300px] md:h-[300px]">
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
                    : 'bg-white dark:bg-[#1a1d24] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#22262f]'
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
                className="px-6 py-3 rounded-full text-sm font-medium bg-white dark:bg-[#1a1d24] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#22262f] focus:outline-none cursor-pointer appearance-none"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option} className="bg-white dark:bg-[#1a1d24]">{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                currentPage === 1
                  ? 'bg-gray-100 dark:bg-[#1a1d24] text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-white dark:bg-[#1a1d24] text-gray-600 dark:text-gray-400 hover:bg-pink-500 hover:text-white'
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
                      : 'bg-white dark:bg-[#1a1d24] text-gray-600 dark:text-gray-400 hover:bg-pink-500 hover:text-white'
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
                  ? 'bg-gray-100 dark:bg-[#1a1d24] text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-white dark:bg-[#1a1d24] text-gray-600 dark:text-gray-400 hover:bg-pink-500 hover:text-white'
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
