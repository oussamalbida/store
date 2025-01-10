'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FiPlus } from 'react-icons/fi';

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
  const { addToCart } = useCart();

  const handleAddToCart = (e, product) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
  };

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
                <Link href={product.link}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </Link>
                
                <div className="absolute top-4 right-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-pink-600 z-10"
                  >
                    <FiPlus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div>
                <Link href={product.link}>
                  <h3 className="font-medium text-gray-900 dark:text-dark-text mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-2">{product.description}</p>
                  <p className="font-bold text-pink-500">${product.price}</p>
                </Link>
                <motion.button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full mt-4 px-6 py-2 bg-pink-500 text-white rounded-full text-sm font-medium 
                    hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus className="w-4 h-4" />
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
