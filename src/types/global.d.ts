'use client';
// src/global.d.ts or types/global.d.ts
export {};

declare global {
  interface Window {
    paypal: any; // You can replace `any` with the proper PayPal types if desired
  }
}
