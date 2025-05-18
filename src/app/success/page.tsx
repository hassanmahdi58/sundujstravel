'use client';

export default function SuccessPage() {
  return (
    <div className="text-center py-8 sm:py-20">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-4 text-sm sm:text-base">Thank you for booking your trip with us!</p>
      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full"
      >
        Back to Home
      </button>
    </div>
  );
}


