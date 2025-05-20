// 'use client';
// import { useState } from 'react';

// Make sure this utility is properly implemented and returns an instance of Stripe or null
// const getStripe = async () => {
//   const { Stripe } = await import('@stripe/stripe-js'); // Dynamically import Stripe.js
//   const stripe = await Stripe('your-publishable-key-here'); // Replace with your actual publishable key
//   return stripe;
// };

// const CheckoutButton = () => {
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//       });

//       if (!res.ok) {
//         throw new Error('Failed to create checkout session');
//       }

//       const { sessionId } = await res.json();
//       const stripe = await getStripe(); // Ensure Stripe is properly loaded

//       // Check if stripe is null or undefined before calling redirectToCheckout
//       if (stripe) {
//         await stripe.redirectToCheckout({ sessionId });
//       } else {
//         console.error('Stripe.js failed to load.');
//       }
//     } catch (err) {
//       console.error('Checkout error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       disabled={loading}
//       onClick={handleCheckout}
//       className={`btn ${loading ? 'loading' : ''}`}
//     >
//       {loading ? 'Processing...' : 'Checkout'}
//     </button>
//   );
// };

// export default CheckoutButton;
