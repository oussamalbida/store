'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchResults({ results, isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 max-h-[70vh] overflow-y-auto"
          >
            {results.length > 0 ? (
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Search Results</h3>
                <div className="grid grid-cols-1 gap-4">
                  {results.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
                      onClick={() => {
                        // Handle product click
                        onClose();
                      }}
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold dark:text-white">{product.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
                        <p className="text-pink-500 font-medium">${product.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No results found
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
