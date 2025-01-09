'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaTwitter } from 'react-icons/fa';

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const socialVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 10 }
  }
};

export default function Footer() {
  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gray-50 dark:bg-gray-900 mt-20 transition-colors duration-300"
    >
      <div className="w-[90%] max-w-[1200px] mx-auto py-16">
        <motion.div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* LAMA Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h3 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              LAMA
            </motion.h3>
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">beni mellal morocco <br/> maroc</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Oussamallbida@gmail.com</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">+212 659 417 658</p>
            </motion.div>
            <motion.div className="flex space-x-4">
              {[FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaTwitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* COMPANY Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">COMPANY</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Affiliates', 'Blog', 'Contact Us'].map((item, index) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SHOP Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">SHOP</h3>
            <ul className="space-y-2">
              {['New Arrivals', 'Accessories', 'Men', 'Women', 'All Products'].map((item, index) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* HELP Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">HELP</h3>
            <ul className="space-y-2">
              {['Customer Service', 'My Account', 'Find a Store', 'Legal & Privacy', 'Gift Card'].map((item, index) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SUBSCRIBE Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">SUBSCRIBE</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Be the first to get the latest news about trends, promotions, and much more!</p>
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <motion.button 
                className="px-6 py-2 text-sm text-white bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                JOIN
              </motion.button>
            </motion.div>
            <motion.div 
              className="space-y-2"
              variants={itemVariants}
            >
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Secure Payments</h4>
              <motion.div 
                className="flex gap-2"
                variants={itemVariants}
              >
                {['/discover.png', '/skrill.png', '/paypal.png', '/mastercard.png', '/visa.png'].map((src, index) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Image src={src} alt={src.split('/')[1].split('.')[0]} width={40} height={25} 
                      className="object-contain dark:opacity-80 hover:dark:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            2024 Lama Shop
          </motion.p>
          <motion.div 
            className="flex items-center gap-4 mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">Language</span>
              <select className="bg-transparent dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md">
                <option>United States | English</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">Currency</span>
              <select className="bg-transparent dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md">
                <option>$ USD</option>
              </select>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
