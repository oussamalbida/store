'use client';

import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
