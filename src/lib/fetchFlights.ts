// src/lib/fetchFlights.ts
import axios from 'axios';

export async function fetchFlights({ origin, destination, date }: {
  origin: string;
  destination: string;
  date: string;
}) {
  const apiKey = process.env.AMADEUS_API_KEY;
  const apiSecret = process.env.AMADEUS_API_SECRET;

  // Get access token
  const tokenResponse = await axios.post(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: apiKey!,
      client_secret: apiSecret!,
    })
  );

  const accessToken = tokenResponse.data.access_token;

  // Fetch flight offers
  const response = await axios.get(
    'https://test.api.amadeus.com/v2/shopping/flight-offers',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: date,
        adults: 1,
        max: 5,
      },
    }
  );

  return response.data.data;
}
