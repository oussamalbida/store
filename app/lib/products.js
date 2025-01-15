'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialProducts = [
  {
    id: 1,
    name: "Quantum Smart Watch",
    price: 299.99,
    category: "Electronics",
    stock: 45,
    sales: 86,
    description: "Advanced smartwatch with health monitoring features",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500"
    ],
    colors: ["#000000", "#FFFFFF", "#C0C0C0"]
  },
  {
    id: 2,
    name: "EcoFriendly Bamboo Set",
    price: 89.99,
    category: "Home",
    stock: 120,
    sales: 62,
    description: "Sustainable bamboo kitchenware set",
    images: [
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=500",
      "https://images.unsplash.com/photo-1595340515671-ea22b5967d99?w=500",
      "https://images.unsplash.com/photo-1579656450812-5b1da79e2474?w=500",
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=500"
    ],
    colors: ["#8B4513", "#DEB887"]
  },
  {
    id: 3,
    name: "Wireless Gaming Headset",
    price: 159.99,
    category: "Gaming",
    stock: 30,
    sales: 20,
    description: "High-quality gaming headset with surround sound",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f0?w=500",
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=500"
    ],
    colors: ["#FF0000", "#000000", "#0000FF"]
  },
  {
    id: 4,
    name: "Organic Coffee Maker",
    price: 199.99,
    category: "Kitchen",
    stock: 75,
    sales: 35,
    description: "Premium coffee maker for the perfect brew",
    images: [
      "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=500",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
      "https://images.unsplash.com/photo-1510591509098-f4d6a45c6ac2?w=500",
      "https://images.unsplash.com/photo-1606937898055-33f161e25305?w=500"
    ],
    colors: ["#C0C0C0", "#000000", "#8B4513"]
  },
  {
    id: 5,
    name: "Professional Camera Kit",
    price: 1299.99,
    category: "Photography",
    stock: 15,
    sales: 8,
    description: "Complete professional photography kit with accessories",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
      "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=500",
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=500"
    ],
    colors: ["#000000", "#808080"]
  },
  {
    id: 6,
    name: "Smart Home Security System",
    price: 399.99,
    category: "Electronics",
    stock: 25,
    sales: 18,
    description: "Complete home security system with cameras, sensors, and mobile app integration",
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=500",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500",
      "https://images.unsplash.com/photo-1593106410288-caf65eca7c9d?w=500",
      "https://images.unsplash.com/photo-1580152785265-12fc76e57c4c?w=500"
    ],
    colors: ["#FFFFFF", "#000000", "#808080"]
  },
  {
    id: 7,
    name: "Luxury Leather Backpack",
    price: 189.99,
    category: "Accessories",
    stock: 40,
    sales: 28,
    description: "Premium leather backpack with laptop compartment and anti-theft features",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500"
    ],
    colors: ["#8B4513", "#000000", "#4A4A4A"]
  },
  {
    id: 8,
    name: "Smart Fitness Mirror",
    price: 1499.99,
    category: "Fitness",
    stock: 10,
    sales: 5,
    description: "Interactive fitness mirror with AI-powered personal training and live classes",
    images: [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500",
      "https://images.unsplash.com/photo-1549476464-37392f717541?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500"
    ],
    colors: ["#000000", "#FFFFFF"]
  },
  {
    id: 9,
    name: "Portable Espresso Maker",
    price: 79.99,
    category: "Kitchen",
    stock: 60,
    sales: 42,
    description: "Compact and portable espresso maker for coffee on the go",
    images: [
      "https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=500",
      "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=500",
      "https://images.unsplash.com/photo-1622623971720-9100c6607693?w=500",
      "https://images.unsplash.com/photo-1610635967991-e4d6a45c6ac2?w=500"
    ],
    colors: ["#C0C0C0", "#000000", "#FF4500"]
  },
  {
    id: 10,
    name: "Smart Plant Monitor",
    price: 49.99,
    category: "Home",
    stock: 85,
    sales: 56,
    description: "Wireless plant monitor that tracks soil moisture, light, and nutrients",
    images: [
      "https://images.unsplash.com/photo-1585590913116-a0991cd9abd2?w=500",
      "https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=500",
      "https://images.unsplash.com/photo-1611912303851-9b1ac12e64e9?w=500",
      "https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=500"
    ],
    colors: ["#32CD32", "#FFFFFF", "#87CEEB"]
  },
  {
    id: 11,
    name: "Noise-Canceling Work Pods",
    price: 299.99,
    category: "Office",
    stock: 20,
    sales: 12,
    description: "Personal workspace pod with noise-canceling technology and ambient lighting",
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=500"
    ],
    colors: ["#808080", "#FFFFFF", "#000000"]
  },
  {
    id: 12,
    name: "Smart Sleep System",
    price: 249.99,
    category: "Wellness",
    stock: 30,
    sales: 22,
    description: "Complete sleep optimization system with smart mattress cover and sleep tracking",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500",
      "https://images.unsplash.com/photo-1544013143-f89c8486d019?w=500",
      "https://images.unsplash.com/photo-1552858725-2758b5fb1286?w=500",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500"
    ],
    colors: ["#E6E6FA", "#000080", "#FFFFFF"]
  },
  {
    id: 13,
    name: "Foldable Electric Bike",
    price: 899.99,
    category: "Transportation",
    stock: 15,
    sales: 8,
    description: "Compact foldable electric bike with 40-mile range and smart features",
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
      "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?w=500",
      "https://images.unsplash.com/photo-1595444612574-0e07578d95c7?w=500",
      "https://images.unsplash.com/photo-1593765087302-d7b9688b9f05?w=500"
    ],
    colors: ["#000000", "#FF4500", "#4169E1"]
  },
  {
    id: 14,
    name: "Smart Hydration Bottle",
    price: 59.99,
    category: "Fitness",
    stock: 70,
    sales: 45,
    description: "Smart water bottle that tracks hydration and glows to remind you to drink",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500",
      "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=500",
      "https://images.unsplash.com/photo-1621371205896-3082fa811d54?w=500"
    ],
    colors: ["#00BFFF", "#FF69B4", "#32CD32"]
  },
  {
    id: 15,
    name: "Aromatherapy Diffuser",
    price: 89.99,
    category: "Wellness",
    stock: 55,
    sales: 38,
    description: "Smart aromatherapy diffuser with app control and mood lighting",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500",
      "https://images.unsplash.com/photo-1608571423901-fb03efd76c49?w=500",
      "https://images.unsplash.com/photo-1608571423428-704621f6b2d8?w=500",
      "https://images.unsplash.com/photo-1544814495-08d3f11e3a26?w=500"
    ],
    colors: ["#FFFFFF", "#FFB6C1", "#E6E6FA"]
  }
];

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      initialized: false,
      init: () => {
        const state = get();
        if (!state.initialized) {
          set({ products: initialProducts, initialized: true });
        }
      },
      addProduct: (product) => {
        const products = get().products;
        set({ products: [...products, { ...product, id: Date.now().toString() }] });
      },
      deleteProduct: (productId) => {
        const products = get().products;
        set({ products: products.filter((p) => p.id !== productId) });
      },
      updateProduct: (productId, updatedProduct) => {
        const products = get().products;
        set({
          products: products.map((p) =>
            p.id === productId ? { ...p, ...updatedProduct } : p
          ),
        });
      },
      getProduct: (productId) => {
        return get().products.find(p => p.id === parseInt(productId));
      },
      getAllProducts: () => get().products,
      updateStock: (productId, newStock) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId 
              ? { ...product, stock: newStock }
              : product
          )
        })),
      updateSales: (productId) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId 
              ? { ...product, sales: product.sales + 1, stock: product.stock - 1 }
              : product
          )
        })),
    }),
    {
      name: 'product-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.init();
        }
      }
    }
  )
);
