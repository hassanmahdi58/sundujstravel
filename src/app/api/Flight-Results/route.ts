import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // Your flight search logic here, or dummy response
  return NextResponse.json({ data: [] });
}