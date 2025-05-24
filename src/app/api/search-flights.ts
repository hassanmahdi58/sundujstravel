// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { origin, destination, date, adults } = body;

//     if (!origin || !destination || !date || !adults) {
//       return NextResponse.json({ error: 'Missing required fields in request body' }, { status: 400 });
//     }

//     // Mock or replace this with real API integration (like Amadeus)
//    const options = {
// 	method: 'GET',
// 	hostname: 'flights-sky.p.rapidapi.com',
// 	port: null,
// 	path: '/google/flights/get-booking-results',
// 	headers: {
// 		'x-rapidapi-key': '532edf627cmsh164d788efd96c7ap19078djsn1b52b6878e21',
// 		'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
// 	}
// };

// const req = http.request(options, function (res) {
// 	const chunks = [];

// 	res.on('data', function (chunk) {
// 		chunks.push(chunk);
// 	});

// 	res.on('end', function () {
// 		const body = Buffer.concat(chunks);
// 		console.log(body.toString());
// 	});
// });

// req.end();