'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiMinus, FiPlus, FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const products = [
  {
    id: 1,
    name: 'Minimalist Watch',
    price: 149.99,
    originalPrice: 199.99,
    category: 'Accessories',
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3',
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56'
    ],
    description: 'Elevate your style with our premium minimalist watch. Featuring a sleek design, premium materials, and precision movement, this timepiece is perfect for both casual and formal occasions.',
    colors: ['#000000', '#8B4513', '#1B4F72'],
    sizes: ['Small', 'Regular', 'Large'],
    rating: 4.5,
    reviews: 128,
    features: [
      'Swiss movement for precise timekeeping',
      'Genuine Italian leather strap',
      'Sapphire crystal glass',
      'Water-resistant up to 30m',
      '316L stainless steel case'
    ],
    productInfo: "Our minimalist watch represents the perfect blend of form and function. The clean dial design eliminates unnecessary elements, focusing on what truly matters - time. The premium materials ensure durability while maintaining a lightweight feel on your wrist.",
    returnPolicy: "We offer a 30-day money-back guarantee. If you're not completely satisfied, return the watch in its original condition for a full refund. We also provide a 2-year warranty against manufacturing defects.",
    shippingInfo: "Free worldwide shipping on all watch orders. Standard delivery takes 3-5 business days. Express shipping available at checkout. Each watch comes in a premium gift box perfect for gifting."
  },
  {
    id: 2,
    name: 'Leather Backpack',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Bags',
    stock: 23,
    images: [
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7',
      'https://images.unsplash.com/photo-1494726161322-5360d4d0eeae',
      'https://images.unsplash.com/photo-1525103504173-8dc1582c7430',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'
    ],
    description: 'A versatile leather backpack that combines classic style with modern functionality. Perfect for work, travel, or everyday use, featuring multiple compartments and premium materials.',
    colors: ['#8B4513', '#000000', '#D2B48C'],
    sizes: ['Standard', 'Large'],
    rating: 4.8,
    reviews: 95,
    features: [
      'Full-grain leather construction',
      'Padded 15" laptop compartment',
      'Water-resistant treatment',
      'YKK zippers',
      'Ergonomic shoulder straps'
    ],
    productInfo: "Crafted from premium full-grain leather, our backpack ages beautifully, developing a unique patina over time. The thoughtfully designed compartments keep your belongings organized, while the padded straps ensure comfort during long days.",
    returnPolicy: "30-day return window for unused items in original packaging. We cover return shipping for defective items. Each bag comes with a lifetime warranty against manufacturing defects.",
    shippingInfo: "Free domestic shipping on orders over $50. International shipping available. Standard delivery: 4-6 business days. Express options available at checkout."
  },
  {
    id: 3,
    name: 'Classic Sneakers',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Shoes',
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b'
    ],
    description: 'Timeless sneakers that blend comfort with style. Made with premium materials and featuring our innovative comfort technology, these sneakers are perfect for everyday wear.',
    colors: ['#FFFFFF', '#000000', '#4A4A4A'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    rating: 4.6,
    reviews: 156,
    features: [
      'Premium leather upper',
      'Memory foam insole',
      'Anti-slip rubber outsole',
      'Breathable mesh lining',
      'Reinforced stitching'
    ],
    productInfo: "Our classic sneakers are built for both style and comfort. The premium leather upper is complemented by a breathable mesh lining, while the memory foam insole provides all-day comfort. The durable construction ensures these sneakers will be your go-to choice for years to come.",
    returnPolicy: "60-day wear test guarantee. Try them for up to 60 days, and if you're not satisfied, return them for a full refund, no questions asked.",
    shippingInfo: "Free shipping and returns within the US. Standard delivery in 3-5 business days. Next-day delivery available for orders placed before 2 PM EST."
  },
  {
    id: 4,
    name: 'Denim Jacket',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Clothing',
    stock: 32,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
      'https://images.unsplash.com/photo-1601333144130-8cbb312386b6',
      'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d'
    ],
    description: 'A modern take on the classic denim jacket. Made from premium Japanese denim and featuring a contemporary fit, this jacket is a versatile addition to any wardrobe.',
    colors: ['#000080', '#000000', '#4169E1'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 82,
    features: [
      'Premium Japanese selvedge denim',
      'Custom YKK buttons and rivets',
      'Reinforced stitching',
      'Interior phone pocket',
      'Adjustable waist tabs'
    ],
    productInfo: "Our denim jacket is crafted from premium Japanese selvedge denim, known for its superior quality and unique aging characteristics. The modern fit is versatile enough to layer over any outfit, while classic details like custom hardware and reinforced stitching ensure lasting durability.",
    returnPolicy: "45-day return period for unworn items with tags attached. Free return shipping within the US. Store credit available for items without tags.",
    shippingInfo: "Complimentary shipping on orders over $100. Standard shipping takes 4-6 business days. Express 2-day shipping available."
  },
  {
    id: 5,
    name: 'Crossbody Bag',
    price: 59.99,
    originalPrice: 79.99,
    category: 'Bags',
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1598532213069-bc8f8557c72b',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e',
      'https://images.unsplash.com/photo-1590739165466-f73a9139a992'
    ],
    description: 'A stylish and practical crossbody bag perfect for everyday use. Features multiple compartments for organization and an adjustable strap for comfort.',
    colors: ['#000000', '#8B4513', '#CD853F'],
    sizes: ['Small', 'Medium'],
    rating: 4.4,
    reviews: 73,
    features: [
      'Genuine leather construction',
      'RFID-blocking pocket',
      'Adjustable shoulder strap',
      'Multiple card slots',
      'Phone compartment'
    ],
    productInfo: "This versatile crossbody bag is designed for the modern lifestyle. With thoughtfully organized compartments including an RFID-blocking pocket for your cards, it keeps your essentials secure and easily accessible.",
    returnPolicy: "30-day returns accepted for items in original condition. Free returns on US orders. International buyers responsible for return shipping.",
    shippingInfo: "Free standard shipping on orders over $50. Delivery in 3-5 business days. International shipping available to select countries."
  },
  {
    id: 6,
    name: 'Running Shoes',
    price: 119.99,
    originalPrice: 149.99,
    category: 'Shoes',
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
      'https://images.unsplash.com/photo-1595950653106-6bf12165a8df',
      'https://images.unsplash.com/photo-1600185365483-711e5b71ea89'
    ],
    description: 'High-performance running shoes designed for both professional athletes and casual runners. Features our latest cushioning technology and breathable materials.',
    colors: ['#FF0000', '#000000', '#4169E1'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    rating: 4.9,
    reviews: 204,
    features: [
      'Responsive cushioning technology',
      'Breathable mesh upper',
      'Carbon fiber plate',
      'Anti-slip rubber outsole',
      'Reflective details'
    ],
    productInfo: "These running shoes represent the pinnacle of our performance technology. The responsive cushioning provides energy return with every step, while the breathable mesh upper keeps your feet cool during intense workouts.",
    returnPolicy: "90-day trial period - run in them, train in them, and if you're not satisfied, return them for a full refund, no questions asked.",
    shippingInfo: "Free expedited shipping on all orders. Standard delivery in 2-4 business days. Next-day delivery available in select areas."
  },
  {
    id: 7,
    name: 'Sunglasses',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Accessories',
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
      'https://images.unsplash.com/photo-1577803645773-f96470509666',
      'https://images.unsplash.com/photo-1604394940287-28716644f1b5'
    ],
    description: 'Premium sunglasses with polarized lenses and UV protection. The classic design suits all face shapes while providing maximum eye protection.',
    colors: ['#000000', '#8B4513', '#DAA520'],
    sizes: ['Standard'],
    rating: 4.3,
    reviews: 167,
    features: [
      'Polarized lenses',
      'UV400 protection',
      'Scratch-resistant coating',
      'Spring hinges',
      'Acetate frames'
    ],
    productInfo: "Our premium sunglasses combine style with superior eye protection. The polarized lenses reduce glare and eye strain, while the UV400 protection blocks harmful rays. The durable acetate frames are designed for comfort and longevity.",
    returnPolicy: "30-day money-back guarantee. Returns must include original case and cleaning cloth. Free return shipping on US orders.",
    shippingInfo: "Free shipping on orders over $75. Standard delivery in 3-5 business days. Express shipping available at checkout."
  },
  {
    id: 8,
    name: 'Wool Sweater',
    price: 99.99,
    originalPrice: 129.99,
    category: 'Clothing',
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
      'https://images.unsplash.com/photo-1584670747417-594a9412fba5',
      'https://images.unsplash.com/photo-1586487310385-711e5b71ea89'
    ],
    description: 'Luxurious merino wool sweater perfect for cold weather. Features a classic design with modern details and exceptional warmth-to-weight ratio.',
    colors: ['#808080', '#000080', '#8B4513'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 91,
    features: [
      'Premium merino wool',
      'Temperature regulating',
      'Moisture-wicking',
      'Machine washable',
      'Ribbed cuffs and hem'
    ],
    productInfo: "Made from premium merino wool, this sweater provides exceptional warmth without bulk. The natural properties of merino wool make it moisture-wicking and odor-resistant, perfect for all-day wear.",
    returnPolicy: "45-day return window for unworn items. Items must have original tags. We cover return shipping for size exchanges.",
    shippingInfo: "Free ground shipping on all orders. Standard delivery in 4-6 business days. Express shipping options available."
  },
  {
    id: 9,
    name: 'Smart Watch',
    price: 299.99,
    originalPrice: 349.99,
    category: 'Electronics',
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d',
      'https://images.unsplash.com/photo-1617043786394-f977fa12eddf',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1'
    ],
    description: 'Advanced smartwatch with health monitoring, fitness tracking, and smart notifications. Features a bright AMOLED display and long battery life.',
    colors: ['#000000', '#SILVER', '#GOLD'],
    sizes: ['40mm', '44mm'],
    rating: 4.8,
    reviews: 342,
    features: [
      'Heart rate monitoring',
      'Sleep tracking',
      'GPS',
      'Water resistant 50m',
      'Up to 7 days battery life'
    ],
    productInfo: "Our latest smartwatch combines advanced health monitoring with seamless connectivity. Track your fitness goals, receive notifications, and monitor your health metrics all from your wrist.",
    returnPolicy: "30-day satisfaction guarantee. Full refund for unused items returned in original packaging.",
    shippingInfo: "Free express shipping on all smartwatch orders. Delivery in 2-3 business days."
  },
  {
    id: 10,
    name: 'Wireless Earbuds',
    price: 159.99,
    originalPrice: 199.99,
    category: 'Electronics',
    stock: 42,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
      'https://images.unsplash.com/photo-1598331668826-20cecc596b86',
      'https://images.unsplash.com/photo-1606220838315-056192d5e927',
      'https://images.unsplash.com/photo-1631867675167-90a456a90863'
    ],
    description: 'Premium wireless earbuds with active noise cancellation, crystal clear sound, and comfortable fit. Perfect for music, calls, and workouts.',
    colors: ['#FFFFFF', '#000000', '#000080'],
    sizes: ['One Size'],
    rating: 4.6,
    reviews: 278,
    features: [
      'Active noise cancellation',
      'Touch controls',
      'Wireless charging',
      '24-hour battery life',
      'IPX4 water resistance'
    ],
    productInfo: "Experience premium sound quality with our wireless earbuds. Featuring advanced noise cancellation and crystal-clear audio, they're perfect for music lovers and professionals alike.",
    returnPolicy: "60-day risk-free trial. Full refund if you're not completely satisfied.",
    shippingInfo: "Free priority shipping on all orders. Same-day shipping for orders before 2 PM."
  },
  {
    id: 11,
    name: 'Yoga Mat',
    price: 49.99,
    originalPrice: 69.99,
    category: 'Sports',
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a',
      'https://images.unsplash.com/photo-1517637382994-f02da38c6728',
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b'
    ],
    description: 'Professional-grade yoga mat with superior grip and cushioning. Made from eco-friendly materials and perfect for all types of yoga practice.',
    colors: ['#4B0082', '#006400', '#800000'],
    sizes: ['Standard'],
    rating: 4.7,
    reviews: 156,
    features: [
      'Non-slip surface',
      'Eco-friendly materials',
      '6mm thickness',
      'Alignment lines',
      'Carrying strap included'
    ],
    productInfo: "Our premium yoga mat provides the perfect balance of grip and comfort. Made from sustainable materials, it's ideal for both beginners and advanced practitioners.",
    returnPolicy: "30-day return policy. Must be in original condition. We cover return shipping.",
    shippingInfo: "Free shipping on orders over $35. Standard delivery in 3-5 business days."
  },
  {
    id: 12,
    name: 'Coffee Maker',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Home',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6',
      'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a'
    ],
    description: 'Programmable coffee maker with built-in grinder, multiple brew strengths, and thermal carafe. Perfect for coffee enthusiasts who appreciate precision brewing.',
    colors: ['#2F4F4F', '#CD853F'],
    sizes: ['12-Cup'],
    rating: 4.9,
    reviews: 203,
    features: [
      'Built-in burr grinder',
      'Programmable timer',
      'Multiple brew strengths',
      'Thermal carafe',
      'Auto shut-off'
    ],
    productInfo: "Experience cafe-quality coffee at home with our premium coffee maker. The built-in grinder ensures the freshest brew, while the thermal carafe keeps your coffee hot for hours.",
    returnPolicy: "45-day money-back guarantee. Free returns if not satisfied.",
    shippingInfo: "Free shipping on all coffee makers. White glove delivery available."
  },
  {
    id: 13,
    name: 'Leather Wallet',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Accessories',
    stock: 55,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93',
      'https://images.unsplash.com/photo-1606503825008-909a67e63c3d',
      'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b',
      'https://images.unsplash.com/photo-1627123424574-724758594e93'
    ],
    description: 'Handcrafted leather wallet with RFID protection and smart organization. Features premium Italian leather and thoughtful design for everyday carry.',
    colors: ['#8B4513', '#000000', '#A0522D'],
    sizes: ['One Size'],
    rating: 4.8,
    reviews: 167,
    features: [
      'Full-grain Italian leather',
      'RFID protection',
      'Multiple card slots',
      'Hidden coin pocket',
      'Slim profile design'
    ],
    productInfo: "Each wallet is handcrafted from premium Italian leather, designed to age beautifully. The thoughtful organization and RFID protection make it perfect for modern needs.",
    returnPolicy: "30-day return window for unused items. Free returns on all orders.",
    shippingInfo: "Free standard shipping. Express shipping available at checkout."
  },
  {
    id: 14,
    name: 'Desk Lamp',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Home',
    stock: 38,
    images: [
      'https://images.unsplash.com/photo-1534073828943-f801091bb18c',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c'
    ],
    description: 'Modern LED desk lamp with wireless charging, adjustable brightness, and color temperature control. Perfect for home office or study space.',
    colors: ['#C0C0C0', '#000000', '#FFFFFF'],
    sizes: ['Standard'],
    rating: 4.7,
    reviews: 143,
    features: [
      'Wireless charging pad',
      'Touch controls',
      'Multiple light modes',
      'USB charging port',
      'Memory function'
    ],
    productInfo: "This smart desk lamp combines modern lighting with practical features. The wireless charging pad and USB port keep your devices powered, while adjustable lighting ensures optimal comfort.",
    returnPolicy: "30-day satisfaction guarantee. Free returns for defective items.",
    shippingInfo: "Free shipping on orders over $100. Standard delivery in 3-5 business days."
  },
  {
    id: 15,
    name: 'Hiking Backpack',
    price: 149.99,
    originalPrice: 189.99,
    category: 'Sports',
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887',
      'https://images.unsplash.com/photo-1622560481156-01fc728e6586',
      'https://images.unsplash.com/photo-1601001815894-4bb6c81416d7',
      'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f'
    ],
    description: 'Professional hiking backpack with hydration system compatibility, multiple compartments, and ergonomic design. Perfect for outdoor adventures.',
    colors: ['#556B2F', '#000000', '#8B4513'],
    sizes: ['40L', '55L'],
    rating: 4.9,
    reviews: 218,
    features: [
      'Waterproof material',
      'Hydration compatible',
      'Ventilated back panel',
      'Hip belt pockets',
      'Trekking pole attachments'
    ],
    productInfo: "Designed for serious hikers, this backpack offers optimal organization and comfort. The ventilated back panel and ergonomic straps make long treks comfortable.",
    returnPolicy: "60-day trial period. Return even after use if not satisfied.",
    shippingInfo: "Free standard shipping. Express delivery available for urgent orders."
  }
];

export default function ProductDetail() {
  const params = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('PRODUCT INFO');
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  const product = products.find(p => p.id === parseInt(params.id)) || products[0];

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePosition({ x, y });
  };

  const handleAddToCart = () => {
    if (selectedSize === null) {
      alert('Please select a size');
      return;
    }
    addToCart({
      ...product,
      selectedColor: product.colors[selectedColor],
      selectedSize,
      quantity
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/shop" className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <div 
              ref={imageContainerRef}
              className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-white cursor-zoom-in"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Main Image */}
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain"
                priority
                quality={100}
              />
              
              {/* Zoomed Image */}
              {isHovering && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.images[selectedImage]})`,
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-pink-500' : 'border-transparent hover:border-pink-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link href="/shop">Shop</Link>
              <span>/</span>
              <Link href={`/shop?category=${product.category}`}>{product.category}</Link>
            </div>
            <h1 className="text-3xl font-medium mb-4 dark:text-white">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-700 dark:text-gray-300">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-pink-500">
                  <FiHeart size={20} />
                </button>
                <button className="text-gray-400 hover:text-pink-500">
                  <FiShare2 size={20} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>
            
            <div className="flex items-center gap-2 mb-8">
              <span className="text-2xl font-bold text-pink-500">${product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3 dark:text-white">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 dark:text-white">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === index ? 'border-pink-500' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 dark:text-white">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-full border transition-all ${
                      selectedSize === size
                        ? 'border-pink-500 bg-pink-50 text-pink-500 dark:bg-pink-500/10'
                        : 'border-gray-200 hover:border-pink-500 dark:border-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 dark:text-white">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-pink-500"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-pink-500"
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 mb-8"
            >
              <FiShoppingCart />
              Add to Cart
            </button>

            {/* Product Information Tabs */}
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700">
                {['PRODUCT INFO', 'RETURN & REFUND POLICY', 'SHIPPING INFO'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'border-b-2 border-pink-500 text-pink-500 -mb-[1px]'
                        : 'text-gray-500 hover:text-pink-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="py-6 text-gray-600 dark:text-gray-400">
                {activeTab === 'PRODUCT INFO' && product.productInfo}
                {activeTab === 'RETURN & REFUND POLICY' && product.returnPolicy}
                {activeTab === 'SHIPPING INFO' && product.shippingInfo}
              </div>
            </div>
          </div>
        </div>

        {/* Product Navigation */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex justify-between items-center">
            <Link
              href={`/shop/${parseInt(params.id) - 1}`}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                parseInt(params.id) <= 1
                  ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-gray-100 hover:bg-pink-500 hover:text-white text-gray-700'
              }`}
              onClick={(e) => {
                if (parseInt(params.id) <= 1) e.preventDefault();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Previous
            </Link>

            <Link
              href={`/shop/${parseInt(params.id) + 1}`}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                parseInt(params.id) >= products.length
                  ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-gray-100 hover:bg-pink-500 hover:text-white text-gray-700'
              }`}
              onClick={(e) => {
                if (parseInt(params.id) >= products.length) e.preventDefault();
              }}
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
