'use client';

import { motion } from 'framer-motion';
import { FiShoppingBag, FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi';
import DashboardLayout from './components/DashboardLayout';

export default function Dashboard() {
  // Sample data - replace with real data in production
  const stats = [
    {
      title: 'Total Sales',
      value: '$12,426',
      change: '+16%',
      icon: FiDollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: '163',
      change: '+12%',
      icon: FiShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Customers',
      value: '1,437',
      change: '+8%',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+2%',
      icon: FiTrendingUp,
      color: 'bg-pink-500'
    }
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 w-~[90%] max-w-[1200px] mx-auto py-12"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Overview</h1>
          <div className="flex space-x-2">
            <select className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className={`text-sm font-semibold ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Order #{Math.floor(Math.random() * 10000)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${(Math.random() * 1000).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Popular Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Popular Products
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Product {index + 1}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.floor(Math.random() * 100)} sales
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ${(Math.random() * 100).toFixed(2)}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      Math.random() > 0.5 ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
