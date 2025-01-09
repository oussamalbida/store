import { NextResponse } from 'next/server';

// Mock product data - replace with your actual data or database query
const products = [
  {
    id: 1,
    name: 'Summer Dress',
    description: 'Light and comfortable summer dress',
    price: 59.99,
    category: 'clothing',
    image: '/images/products/summer-dress.jpg'
  },
  {
    id: 2,
    name: 'Winter Jacket',
    description: 'Warm winter jacket for cold days',
    price: 129.99,
    category: 'clothing',
    image: '/images/products/winter-jacket.jpg'
  },
  {
    id: 3,
    name: 'Casual Jeans',
    description: 'Comfortable everyday jeans',
    price: 79.99,
    category: 'clothing',
    image: '/images/products/jeans.jpg'
  },
  {
    id: 4,
    name: 'Leather Handbag',
    description: 'Elegant leather handbag',
    price: 149.99,
    category: 'bags',
    image: '/images/products/handbag.jpg'
  },
  {
    id: 5,
    name: 'Running Shoes',
    description: 'Comfortable running shoes',
    price: 89.99,
    category: 'shoes',
    image: '/images/products/shoes.jpg'
  },
  {
    id: 6,
    name: 'Silver Necklace',
    description: 'Beautiful silver necklace',
    price: 49.99,
    category: 'accessories',
    image: '/images/products/necklace.jpg'
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category')?.toLowerCase();

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  let results = products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );

  if (category && category !== 'all') {
    results = results.filter(product => product.category === category);
  }

  return NextResponse.json({ results });
}
