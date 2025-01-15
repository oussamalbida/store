'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout';
import { useProductStore } from '@/app/lib/products';

export default function ProductsManagement() {
  const { products, deleteProduct, init } = useProductStore();
  
  useEffect(() => {
    init();
  }, [init]);

  const handleDelete = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Products Management</h1>
          <Link href="/dashboard/products/add">
            <button className="flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors">
              <FiPlus className="mr-2" />
              Add New Product
            </button>
          </Link>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 bg-[#1e293b] px-6 py-3 rounded-t-xl text-xs font-medium text-gray-400 uppercase">
          <div className="col-span-4">Product</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Stock</div>
          <div className="col-span-2">Actions</div>
        </div>

        {/* Table Body */}
        <div className="bg-[#1e293b] rounded-b-xl">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-t border-[#2d3748] hover:bg-[#2d3748] transition-colors"
            >
              <div className="col-span-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 relative rounded-lg overflow-hidden bg-[#2d3748]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {product.sales} sales
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-500 bg-opacity-10 text-pink-500">
                  {product.category}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-white">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-white">
                  {product.stock}
                </span>
              </div>
              <div className="col-span-2">
                <div className="flex space-x-3">
                  <Link href={`/dashboard/products/edit/${product.id}`}>
                    <button className="p-2 rounded-lg hover:bg-[#374151] text-blue-400 hover:text-blue-300 transition-colors">
                      <FiEdit2 size={18} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 rounded-lg hover:bg-[#374151] text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
