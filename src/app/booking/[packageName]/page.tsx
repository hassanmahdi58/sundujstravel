// src/app/booking/[packageName]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Updated for Next.js App Router
import PaypalButton from '../../../components/PaypalButton';

const BookingPage = () => {
  const { packageName } = useParams(); // Get the route parameter using `useParams` hook
  const [decodedPackageName, setDecodedPackageName] = useState<string | null>(null);
  const price = 1299; // Example price

  useEffect(() => {
    if (packageName) {
      // Ensure packageName is a string, not an array
      const name = Array.isArray(packageName) ? packageName[0] : packageName;
      setDecodedPackageName(decodeURIComponent(name)); // Decode the package name
    }
  }, [packageName]);

  if (!decodedPackageName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book: {decodedPackageName}</h1>
      <p>Price: ${price}</p>
      <PaypalButton packageName={decodedPackageName} price={price} />
    </div>
  );
};

export default BookingPage;
