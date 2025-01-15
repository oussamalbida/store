'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiHome, FiBox, FiTag, FiShoppingBag, FiSettings, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const sidebarLinks = [
  { name: 'Overview', href: '/dashboard', icon: FiHome },
  { name: 'Products', href: '/dashboard/products', icon: FiBox },
  { name: 'Categories', href: '/dashboard/categories', icon: FiTag },
  { name: 'Orders', href: '/dashboard/orders', icon: FiShoppingBag },
  { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
];

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/dashboard/login') {
      router.push('/dashboard/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user && pathname !== '/dashboard/login') {
    return null;
  }

  if (pathname === '/dashboard/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900  w-[110%] ml-[-150px]">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          {user && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{user.email}</p>
          )}
        </div>
        <nav className="mt-6">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                pathname === link.href ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <link.icon className="w-5 h-5 mr-3" />
              <span>{link.name}</span>
            </Link>
          ))}
          <button
            onClick={logout}
            className="w-full flex items-center px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiLogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </motion.aside>

      {/* Main content */}
      <main className={`transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-64' : ''
      } p-6 md:p-8`}>
        {children}
      </main>
    </div>
  );
}
