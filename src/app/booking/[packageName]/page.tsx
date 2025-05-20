'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PaypalButton from '../../../components/PaypalButton';

const BookingPage = () => {
  const { packageName } = useParams(); // Get the route parameter using `useParams` hook
  const [decodedPackageName, setDecodedPackageName] = useState<string | null>(null);
  const price = 1299; // Example price

  useEffect(() => {
    if (packageName) {
      const name = Array.isArray(packageName) ? packageName[0] : packageName;
      setDecodedPackageName(decodeURIComponent(name)); // Decode the package name
    }
  }, [packageName]);

  if (!decodedPackageName) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Package: {decodedPackageName}</h1>
        <p className="text-lg text-gray-500 italic">Your ultimate experience awaits!</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h3 className="text-3xl font-semibold text-green-600 mb-4">Price: ${price}</h3>
          <p className="text-gray-700 mb-6">Includes all travel and accommodation costs, guaranteed fun!</p>
          <PaypalButton packageName={decodedPackageName} price={price} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
