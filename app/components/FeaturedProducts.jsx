'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500',
    title: 'Cozy knitwear essential.',
    price: 49.99,
    description: 'Comfortable and stylish knitwear for any occasion.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500',
    title: 'Spacious and durable carry-all.',
    price: 79.99,
    description: 'Perfect for everyday use or travel.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=500',
    title: 'Artisan-made home decor.',
    price: 29.99,
    description: 'Handcrafted with care and attention to detail.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500',
    title: 'Durable and stylish backpack.',
    price: 89.99,
    description: 'Perfect for work, school, or travel.'
  }
];

export default function FeaturedProducts() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      description: product.description
    });
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition-colors"
                  >
                    +
                  </button>
                </div>
                <Link href={`/product/${product.id}`} className="block">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                </Link>
              </div>
              <div className="p-6">
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {product.title}
                  </h3>
                  <p className="text-pink-500 font-bold mb-4">${product.price}</p>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
