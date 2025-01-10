'use client'
 
import { useEffect } from 'react'
 
export default function ShopError({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h2 className="text-2xl font-semibold">Oops! Something went wrong while loading the shop</h2>
      <p className="text-gray-600">We apologize for the inconvenience</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
