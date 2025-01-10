import Link from 'next/link'
 
export default function ShopNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h2 className="text-2xl font-semibold">Product Not Found</h2>
      <p className="text-gray-600">The product you're looking for doesn't exist or has been removed</p>
      <div className="flex space-x-4">
        <Link 
          href="/shop"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Back to Shop
        </Link>
        <Link 
          href="/"
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
