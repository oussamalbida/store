'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PageLayout from '../components/PageLayout';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const stats = [
  { value: '5K+', label: 'Products' },
  { value: '50K+', label: 'Customers' },
  { value: '100+', label: 'Countries' },
  { value: '95%', label: 'Satisfaction' }
];

const team = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: '/images/team/john.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    name: 'Jane Smith',
    role: 'Creative Director',
    image: '/images/team/jane.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Designer',
    image: '/images/team/mike.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
      instagram: '#'
    }
  }
];

const features = [
  {
    title: 'Sustainability',
    description: 'We\'re committed to reducing our environmental impact through sustainable practices and materials.'
  },
  {
    title: 'Innovation',
    description: 'We constantly push boundaries to bring you the latest in fashion technology and design.'
  },
  {
    title: 'Community',
    description: 'We believe in building strong relationships with our customers and giving back to our community.'
  }
];

export default function About() {
  return (
    <PageLayout
      title="About Us"
      subtitle="Discover our story, our mission, and the team behind our success"
    >
      {/* Hero Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-3xl font-bold dark:text-white">Crafting Fashion Excellence Since 2010</h2>
          <p className="text-gray-600 dark:text-gray-400">
            LAMA began with a simple vision: to create fashion that combines style, comfort, and sustainability. 
            Today, we're proud to be one of the leading fashion retailers, serving customers worldwide with 
            our unique blend of contemporary design and timeless elegance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-pink-500 text-white rounded-full font-medium"
          >
            Learn More
          </motion.button>
        </motion.div>
        <motion.div variants={itemVariants} className="relative h-[400px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="About LAMA"
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              transition: { 
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm cursor-pointer transform transition-all duration-300"
          >
            <motion.h3 
              className="text-3xl font-bold text-pink-500 mb-2"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {stat.value}
            </motion.h3>
            <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Team Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold mb-12 dark:text-white"
        >
          Meet Our Team
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
                y: -10,
                transition: { 
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm cursor-pointer transform transition-all duration-300"
            >
              <motion.div 
                className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300"
                />
              </motion.div>
              <motion.h3 
                className="text-xl font-bold mb-2 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {member.name}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.1 }}
              >
                {member.role}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.04,
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
              y: -5,
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 25
              }
            }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm cursor-pointer transform transition-all duration-300"
          >
            <motion.h3 
              className="text-xl font-bold mb-4 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {feature.title}
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.1 }}
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </PageLayout>
  );
}
