'use client';

import { useState } from 'react';
import { CalendarIcon, PlaneTakeoffIcon, PlaneLandingIcon, UsersIcon } from 'lucide-react';

type FlightSearchData = {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
};

type FlightFormProps = {
  onSearch: (data: FlightSearchData[]) => void; // Keep this if results come from the API
};

export default function FlightForm({ onSearch }: FlightFormProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/search-flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: origin.toUpperCase(),
          destination: destination.toUpperCase(),
          date,
          adults: passengers,
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch flight results');

      const json = await res.json();
      onSearch(json.data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white shadow-xl rounded-2xl max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center text-blue-800">✈️ Find Your Flight</h2>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">From</label>
        <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm">
          <PlaneTakeoffIcon className="text-gray-400" />
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g. London"
            className="w-full focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">To</label>
        <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm">
          <PlaneLandingIcon className="text-gray-400" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Istanbul"
            className="w-full focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Departure Date</label>
        <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm">
          <CalendarIcon className="text-gray-400" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Passengers</label>
        <div className="flex items-center gap-2 border p-3 rounded-lg shadow-sm">
          <UsersIcon className="text-gray-400" />
          <input
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            min={1}
            className="w-full focus:outline-none"
            required
          />
        </div>
      </div>

      {error && <p className="text-red-600 font-semibold text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-lg text-white transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Searching...' : '🔍 Search Flights'}
      </button>
    </form>
  );
}
