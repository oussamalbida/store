'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import { FiUpload, FiX, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '@/app/lib/products';

export default function AddProduct() {
  const router = useRouter();
  const { addProduct } = useProductStore();
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      return data.path;
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    await processImageFiles(files);
  };

  const processImageFiles = async (files) => {
    setUploading(true);
    setError('');

    try {
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          setError('Each image must be less than 5MB');
          continue;
        }

        const imagePath = await uploadImage(file);
        setImages(prev => [...prev, imagePath]);
      }
    } catch (err) {
      setError('Error uploading images. Please try again.');
      console.error('Error processing images:', err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await processImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (images.length === 0) {
        setError('Please add at least one image');
        return;
      }

      const formData = new FormData(e.target);
      const productData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        stock: parseInt(formData.get('stock')),
        sales: 0,
        image: images[0], // Use first image as main image
        images: images // Store all images
      };

      // Add product using Zustand store
      addProduct(productData);
      
      // Redirect back to products page
      router.push('/dashboard/products');
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error('Error adding product:', err);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-8">Add New Product</h1>
          
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Info Fields */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:border-pink-500"
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:border-pink-500"
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home">Home</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Office">Office</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:border-pink-500"
                placeholder="Enter product description"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:border-pink-500"
                  placeholder="Enter price"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:border-pink-500"
                  placeholder="Enter stock quantity"
                />
              </div>
            </div>

            {/* Image Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragging ? 'border-pink-500 bg-pink-500 bg-opacity-10' : 'border-gray-600'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-300">
                      Drop images here or click to upload
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-400 mt-2">Max: 5MB per image</p>
                </div>
              </div>
            </div>

            {/* Image Previews */}
            <div className="grid grid-cols-4 gap-4">
              <AnimatePresence>
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-lg overflow-hidden bg-[#1e293b]"
                  >
                    <Image
                      src={image}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <FiX size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {uploading && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
                <p className="text-gray-400 mt-2">Uploading images...</p>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className={`px-6 py-2 rounded-lg bg-pink-500 text-white transition-colors ${
                  uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
                }`}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
