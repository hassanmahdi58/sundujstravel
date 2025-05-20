export default function FlightResults({ results }) {
  if (!results.length) return <p className="mt-4 text-gray-500">No results found.</p>

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Results</h2>
      <ul className="space-y-4">
        {results.map((flight, idx) => (
          <li key={idx} className="p-4 border rounded-xl shadow">
            <p><strong>{flight.origin}</strong> → <strong>{flight.destination}</strong></p>
            <p>Airline: {flight.airline}</p>
            <p>Departure: {flight.departureTime}</p>
            <p>Price: ${flight.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
