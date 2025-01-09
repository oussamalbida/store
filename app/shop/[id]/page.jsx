'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiMinus, FiPlus } from 'react-icons/fi';

const products = [
  {
    id: 1,
    name: 'Classic Tote Bag',
    originalPrice: 20,
    price: 18,
    description: 'This canvas tote bag is a practical choice for your everyday needs. Made from durable materials, it features a spacious main compartment and sturdy handles for comfortable carrying. Whether you\'re heading to the grocery store or running errands, this simple yet functional bag is ready to accompany you on your daily adventures.',
    colors: ['#FFF1E6', '#E6E6FA', '#000000'],
    sizes: ['Small', 'Medium', 'Large'],
    images: [
      '/images/products/tote-1.jpg',
      '/images/products/tote-2.jpg',
      '/images/products/tote-3.jpg',
      '/images/products/tote-4.jpg'
    ],
    productInfo: "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
    returnPolicy: "I'm a Return and Refund policy. I'm a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
    shippingInfo: "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence."
  }
];

export default function ProductDetail() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('PRODUCT INFO');

  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/shop" className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <div className="relative aspect-square mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="relative aspect-square border border-gray-200"
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="text-sm mb-4">classic</div>
            <h1 className="text-2xl font-medium mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="flex items-center gap-2 mb-8">
              <span className="text-gray-400 line-through">${product.originalPrice}</span>
              <span className="text-xl">${product.price}</span>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm mb-3">Choose a Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-6 h-6 rounded-full border ${
                      selectedColor === index ? 'border-gray-400' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm mb-3">Choose a Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-full border ${
                      selectedSize === size
                        ? 'border-gray-400'
                        : 'border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <h3 className="text-sm mb-3">Choose a Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-gray-200"
                >
                  <FiMinus />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-200"
                >
                  <FiPlus />
                </button>
                {selectedSize === 'Medium' && (
                  <span className="ml-4 text-sm text-red-500">
                    Variant is out of stock.
                    <br />
                    Please choose another option
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={selectedSize === 'Medium'}
              className={`w-full py-3 rounded-full mb-8 ${
                selectedSize === 'Medium'
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}
            >
              Add to Cart
            </button>

            {/* Product Information Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex gap-8 border-b border-gray-200">
                {['PRODUCT INFO', 'RETURN & REFUND POLICY', 'SHIPPING INFO'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-sm font-medium ${
                      activeTab === tab
                        ? 'border-b-2 border-gray-900 text-gray-900 -mb-[1px]'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="py-6 text-gray-600">
                {activeTab === 'PRODUCT INFO' && product.productInfo}
                {activeTab === 'RETURN & REFUND POLICY' && product.returnPolicy}
                {activeTab === 'SHIPPING INFO' && product.shippingInfo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
