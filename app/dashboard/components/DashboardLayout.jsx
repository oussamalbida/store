'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiHome, FiBox, FiTag, FiShoppingBag, FiSettings, FiLogOut, FiSearch, FiShoppingCart } from 'react-icons/fi';

export default function DashboardLayout({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#1e293b] z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              
            </div>
            
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#1e293b] text-white p-4">
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <p className="text-sm text-gray-400">admin@example.com</p>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-[#2d3748] rounded-lg transition-colors">
                  <FiHome className="mr-3" />
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/dashboard/products" className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-[#2d3748] rounded-lg transition-colors">
                  <FiBox className="mr-3" />
                  Products
                </Link>
              </li>
              <li>
                <Link href="/dashboard/categories" className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-[#2d3748] rounded-lg transition-colors">
                  <FiTag className="mr-3" />
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-[#2d3748] rounded-lg transition-colors">
                  <FiShoppingBag className="mr-3" />
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-[#2d3748] rounded-lg transition-colors">
                  <FiSettings className="mr-3" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto">
            <Link href="/dashboard/logout" className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-[#2d3748] rounded-lg transition-colors">
              <FiLogOut className="mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-16 p-8">
        {children}
      </main>
    </div>
  );
}
