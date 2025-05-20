import { useState } from 'react'
import axios from 'axios'

export default function FlightForm({ onSearch }) {
  const [tripType, setTripType] = useState('oneway')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const searchFlights = async (e) => {
    e.preventDefault()
    const options = {
      method: 'GET',
      url: `https://${import.meta.env.VITE_RAPIDAPI_HOST}/search`,
      params: {
        origin,
        destination,
        departDate: departureDate,
        returnDate: tripType === 'roundtrip' ? returnDate : undefined,
        adults: '1',
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
      },
    }

    try {
      const response = await axios.request(options)
      onSearch(response.data.flights || [])
    } catch (error) {
      console.error('Error fetching flights', error)
      onSearch([])
    }
  }

  return (
    <form onSubmit={searchFlights} className="space-y-4">
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === 'oneway'}
            onChange={() => setTripType('oneway')}
          />
          <span>One-way</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="tripType"
            value="roundtrip"
            checked={tripType === 'roundtrip'}
            onChange={() => setTripType('roundtrip')}
          />
          <span>Round-trip</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Origin (e.g. JFK)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Destination (e.g. LAX)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="border p-2 rounded"
          required
        />
        {tripType === 'roundtrip' && (
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="border p-2 rounded"
            required
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search Flights
      </button>
    </form>
  )
}
