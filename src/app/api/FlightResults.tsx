// components/FlightResults.tsx
'use client';

type FlightResultType = {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  airline?: string;
  price?: string;
};

export default function FlightResults({ results }: { results: FlightResultType[] }) {
  if (!results.length) return <p className="mt-4 text-gray-500">No flights found.</p>;

  return (
    <div className="mt-6 space-y-4">
      {results.map((flight, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
          <div className="font-semibold">
            {flight.origin} → {flight.destination}
          </div>
          <div className="text-sm text-gray-700">
            {flight.date} | {flight.airline} | {flight.passengers} Passengers
          </div>
          <div className="text-blue-600 font-bold">£{flight.price}</div>
        </div>
      ))}
    </div>
  );
}
