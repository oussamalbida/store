'use client';

import PageLayout from '../../components/PageLayout';

export default function ProductDetailLoading() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex space-x-2 overflow-x-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-24 h-24 bg-gray-200 animate-pulse rounded-lg flex-shrink-0"></div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
              ))}
            </div>
            <div className="h-10 bg-gray-200 animate-pulse rounded w-1/3"></div>
            <div className="flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
              ))}
            </div>
            <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
