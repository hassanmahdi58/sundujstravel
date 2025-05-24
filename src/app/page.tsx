'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FlightForm from '../components/FlightForm';
import FlightResults from './api/FlightResults';

type FlightResultType = {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  airline?: string;
  price?: string;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<FlightResultType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://mn-tz.ltd/NDE5OTY3.js?t=419967';
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  async function handleSearch(data: { origin: string; destination: string; date: string; passengers: number }) {
    try {
      const res = await fetch('/api/search-flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: data.origin.toUpperCase(),
          destination: data.destination.toUpperCase(),
          date: data.date,
          adults: data.passengers,
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch flights');

      const json = await res.json();

      const mappedResults = json.data.map((flight: any) => ({
        origin: data.origin.toUpperCase(),
        destination: data.destination.toUpperCase(),
        date: data.date,
        passengers: data.passengers,
        airline: flight.itineraries[0].segments[0].carrierCode,
        price: flight.price?.total ?? 'N/A',
      }));

      setResults(mappedResults);
    } catch (error) {
      console.error(error);
      setResults([]);
      alert('Error fetching flight data. Please try again.');
    }
  }

  const handleBookNow = (packageName: string | number | boolean) => {
    router.push(`/booking/${encodeURIComponent(String(packageName))}`);
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-sm py-2 px-4 flex justify-between items-center">
        <div>
          🇬🇧 UK — Call us tomorrow from 10am: <span className="font-semibold">01993 461 470</span>
        </div>
        <a href="#contact" className="bg-white text-blue-900 font-semibold py-1 px-3 rounded hover:bg-blue-100 transition">
          Request a Quote
        </a>
      </div>

      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src="/images/logo.jpg" alt="TravelAgency Logo" width={80} height={40} className="object-contain" />
            <h1 className="text-3xl font-bold text-blue-600">Sundus Travel</h1>
          </div>

          <button
            className="md:hidden block text-blue-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className="hidden md:flex space-x-6">
            <a href="#destinations" className="hover:text-blue-500">Destinations</a>
            <a href="#testimonials" className="hover:text-blue-500">Testimonials</a>
            <a href="#contact" className="hover:text-blue-500">Contact</a>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden px-4 py-4 space-y-4 bg-white shadow-lg">
            <a href="#destinations" className="block hover:text-blue-500">Destinations</a>
            <a href="#testimonials" className="block hover:text-blue-500">Testimonials</a>
            <a href="#contact" className="block hover:text-blue-500">Contact</a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-blue-50 text-center py-24">
        <div className="absolute inset-0">
          <Image src="/images/hassan1.jpg" alt="Hero Image" fill style={{ objectFit: 'cover', opacity: 0.8 }} priority />
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold text-white">Explore the World with Us</h2>
          <p className="mt-4 text-lg text-white">Unforgettable journeys to breathtaking destinations.</p>
          <button className="mt-6 px-8 py-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
            Discover Tours
          </button>
        </div>
      </section>

      {/* Flight Search */}
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">✈️ Flight Finder</h1>
          <FlightForm onSearch={handleSearch} />
          <FlightResults results={results} />
        </div>
      </div>

      {/* Featured Destinations */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-4xl font-semibold text-center mb-10">Featured Destinations</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Paris, France', img: '/images/hassan.jpg' },
            { name: 'Kyoto, Japan', img: '/images/hassan1.jpg' },
            { name: 'Cape Town, South Africa', img: '/images/hassan2.jpg' }
          ].map(({ name, img }, index) => (
            <div key={index} className="rounded overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
              <div className="w-full h-64 relative">
                <Image src={img} alt={name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="p-4 bg-white">
                <h4 className="text-xl font-bold text-blue-700">{name}</h4>
                <button
                  onClick={() => handleBookNow(name)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-semibold mb-10">What Our Clients Say</h3>
          <div className="space-y-10">
            {[
              { quote: 'The trip was magical!', name: 'Emily R., USA' },
              { quote: 'Best travel experience I’ve ever had.', name: 'Ahmed K., UAE' },
              { quote: 'A once-in-a-lifetime adventure.', name: 'Sarah L., UK' }
            ].map(({ quote, name }, i) => (
              <blockquote key={i} className="italic text-gray-600">
                "{quote}"
                <footer className="mt-4 font-bold">— {name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="max-w-2xl mx-auto px-4 py-20">
        <h3 className="text-4xl font-semibold text-center mb-8">Get in Touch</h3>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" className="w-full border border-gray-300 p-4 rounded" />
          <input type="email" placeholder="Your Email" className="w-full border border-gray-300 p-4 rounded" />
          <textarea placeholder="Your Message" className="w-full border border-gray-300 p-4 rounded h-40" />
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded hover:bg-blue-700 transition duration-300">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} TravelAgency. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="https://www.facebook.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
