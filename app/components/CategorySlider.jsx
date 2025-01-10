'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const categories = [
  {
    id: 1,
    name: 'Featured',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc',
    link: '/shop?category=Featured'
  },
  {
    id: 2,
    name: 'Home',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    link: '/shop?category=Home'
  },
  {
    id: 3,
    name: 'Jeans',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
    link: '/shop?category=Clothing'
  },
  {
    id: 4,
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1512327428889-607eeb19efe8',
    link: '/shop?category=Shoes'
  },
  {
    id: 5,
    name: 'T-shirts',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
    link: '/shop?category=Clothing'
  },
  {
    id: 6,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d',
    link: '/shop?category=Accessories'
  },
  {
    id: 7,
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956',
    link: '/shop?category=Clothing'
  },
  {
    id: 8,
    name: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a',
    link: '/shop?category=Clothing'
  },
  {
    id: 9,
    name: 'Sportswear',
    image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4',
    link: '/shop?category=Sports'
  },
  {
    id: 10,
    name: 'Bags',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7',
    link: '/shop?category=Bags'
  }
];

export default function CategorySlider() {
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    const startAutoScroll = () => {
      if (!sliderRef.current || !isAutoScrolling) return;
      
      const scrollAmount = 2; // Adjust this value to control scroll speed
      sliderRef.current.scrollLeft += scrollAmount;

      // Reset to start when reaching the end
      if (sliderRef.current.scrollLeft >= 
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth) {
        sliderRef.current.scrollLeft = 0;
      }

      autoScrollRef.current = requestAnimationFrame(startAutoScroll);
    };

    autoScrollRef.current = requestAnimationFrame(startAutoScroll);

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling]);

  const handleMouseDown = (e) => {
    setIsAutoScrolling(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!startX) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setStartX(null);
    setIsAutoScrolling(true);
  };

  const handleMouseLeave = () => {
    setStartX(null);
    setIsAutoScrolling(true);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-8 px-[5%] ml-[10%]">Categories</h2>
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-6 pb-8 cursor-grab active:cursor-grabbing scrollbar-hide px-[5%]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {[...categories, ...categories].map((category, index) => (
            <Link 
              href={category.link} 
              key={`${category.id}-${index}`}
              className="flex-none w-[300px] group"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
