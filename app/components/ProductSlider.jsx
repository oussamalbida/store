'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const products = [
  {
    id: 1,
    name: 'Virtual Incense',
    description: 'Serene digital aromatherapy',
    price: 45,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    link: '/product/virtual-incense'
  },
  {
    id: 2,
    name: 'Rustic Wooden Chair',
    description: 'Durable oak wood seating.',
    price: 15,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657',
    link: '/product/wooden-chair'
  },
  {
    id: 3,
    name: 'Classic White T-Shirt',
    description: 'Versatile cotton material',
    price: 120,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    link: '/product/white-tshirt'
  },
  {
    id: 4,
    name: 'Green Knit Sweater',
    description: 'Cozy knitwear essential.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
    link: '/product/green-sweater'
  }
];

export default function ProductSlider() {
  return (
    <div className="w-full">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-8 px-[5%] ml-[10%] dark:text-dark-text"
      >
        New Products
      </motion.h2>
      <div className="px-[5%]">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              className="group relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-50 dark:bg-dark-card">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-4"
                  whileHover={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button 
                    className="bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium 
                      text-gray-900 dark:text-white shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Quick Add
                  </motion.button>
                </motion.div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <motion.h3 
                    className="font-medium text-gray-900 dark:text-white"
                    whileHover={{ color: '#ec4899' }}
                  >
                    {product.name}
                  </motion.h3>
                  <motion.span 
                    className="font-semibold text-gray-900 dark:text-white"
                    whileHover={{ color: '#ec4899' }}
                  >
                    ${product.price}
                  </motion.span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {product.description}
                </p>
                <motion.button 
                  className="w-full px-4 py-2 text-sm text-pink-500 border border-pink-500 rounded-full 
                    dark:text-pink-400 dark:border-pink-400 transition-all duration-300 ease-out"
                  whileHover={{ 
                    backgroundColor: '#ec4899',
                    color: '#ffffff',
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
