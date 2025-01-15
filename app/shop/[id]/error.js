'use client';

import { useEffect } from 'react';
import PageLayout from '../../components/PageLayout';

export default function ProductDetailError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-semibold">Oops! Something went wrong while loading the product</h2>
        <p className="text-gray-600">We apologize for the inconvenience</p>
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </PageLayout>
  );
}
