'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useProductStore } from '../../lib/products';
import PageLayout from '../../components/PageLayout';
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus, FiHeart, FiShare2 } from 'react-icons/fi';

export default function ProductDetail() {
  const params = useParams();
  const productId = params?.id;
  const { getProduct } = useProductStore();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (!productId) return;
    
    const foundProduct = getProduct(productId);
    if (foundProduct) {
      // Ensure product has images array
      const productWithImages = {
        ...foundProduct,
        images: foundProduct.images || [foundProduct.image || 'https://via.placeholder.com/400']
      };
      setProduct(productWithImages);
      if (productWithImages.colors?.length > 0) {
        setSelectedColor(productWithImages.colors[0]);
      }
      setLoading(false);
    }
  }, [productId, getProduct]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const newQuantity = prev + delta;
      return newQuantity >= 1 && newQuantity <= (product?.stock || 1) ? newQuantity : prev;
    });
  };

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        quantity,
        selectedColor,
        selectedImage: product.images[selectedImage]
      };
      addToCart(cartItem);
      
      // Optional: Reset quantity after adding to cart
      setQuantity(1);
    }
  };

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleImageNavigation = (direction) => {
    if (!product?.images) return;
    const totalImages = product.images.length;
    if (direction === 'next') {
      setSelectedImage((prev) => (prev + 1) % totalImages);
    } else {
      setSelectedImage((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  if (loading || !product) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div 
              ref={imageContainerRef}
              className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-[#1a1d24]"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
            >
              <div className="relative w-full h-full">
                {/* Regular Image */}
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Zoomed Image */}
                {isHovering && (
                  <div 
                    className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${product.images[selectedImage]})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '200%',
                      backgroundRepeat: 'no-repeat',
                      opacity: isHovering ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out',
                    }}
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => handleImageNavigation('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/80 p-2 rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black transition-all"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => handleImageNavigation('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/80 p-2 rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black transition-all"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === index
                        ? 'ring-2 ring-pink-500'
                        : 'hover:ring-2 hover:ring-pink-500/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-pink-500">
                ${product.price.toFixed(2)}
              </span>
              {product.stock <= 10 && (
                <span className="px-2.5 py-0.5 text-sm rounded-full bg-red-100 text-red-800">
                  Only {product.stock} left
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-gray-900 dark:text-white">Colors</h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? 'border-pink-500 scale-110'
                          : 'border-transparent hover:border-pink-500/50'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">Quantity</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiMinus size={20} />
                </button>
                <span className="text-xl font-medium text-gray-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiPlus size={20} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition-colors"
            >
              Add to Cart
            </button>

            {/* Additional Actions */}
            <div className="flex gap-4">
              <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <FiHeart size={20} />
                Add to Wishlist
              </button>
              <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <FiShare2 size={20} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
