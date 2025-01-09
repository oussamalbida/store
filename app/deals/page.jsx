'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PageLayout from '../components/PageLayout';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const deals = [
  {
    id: 1,
    title: 'Summer Collection',
    discount: '30% OFF',
    description: 'Get ready for summer with our latest collection',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    endDate: '2025-01-15'
  },
  {
    id: 2,
    title: 'Premium Accessories',
    discount: '25% OFF',
    description: 'Exclusive deals on all premium accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    endDate: '2025-01-20'
  },
  {
    id: 3,
    title: 'Winter Clearance',
    discount: '50% OFF',
    description: 'Massive discounts on winter collection',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    endDate: '2025-01-25'
  }
];

export default function Deals() {
  return (
    <PageLayout 
      title="Special Deals" 
      subtitle="Don't miss out on our limited-time offers"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {deals.map((deal, index) => (
          <motion.div
            key={deal.title}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 15
              }
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform-gpu"
          >
            <motion.div 
              className="relative h-48 group"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={deal.image}
                alt={deal.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.span 
                  className="text-4xl font-bold text-white"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {deal.discount} OFF
                </motion.span>
              </motion.div>
            </motion.div>
            <motion.div 
              className="p-6"
              whileHover={{ backgroundColor: "rgba(255,105,180,0.1)" }}
            >
              <motion.h3 
                className="text-xl font-bold mb-2 dark:text-white"
                whileHover={{ color: "#FF69B4", x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {deal.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 mb-4"
                whileHover={{ color: "#FF69B4" }}
              >
                {deal.description}
              </motion.p>
              <div className="flex justify-between items-center">
                <motion.span 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  whileHover={{ color: "#FF69B4" }}
                >
                  Ends: {new Date(deal.endDate).toLocaleDateString()}
                </motion.span>
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "#FF69B4",
                    boxShadow: "0 5px 15px rgba(255,105,180,0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-medium transition-all duration-300"
                >
                  Shop Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Get Notified About New Deals</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Subscribe to our newsletter and never miss out on exclusive offers</p>
        <div className="flex max-w-md mx-auto gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-pink-500 dark:text-white"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg font-medium"
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>
    </PageLayout>
  );
}
