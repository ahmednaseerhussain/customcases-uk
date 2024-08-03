// src/app/api/auth/[kindeAuth]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(req: NextRequest) {
  try {
    // Handle authentication
    const authFunction = handleAuth();
    await authFunction(req, NextResponse);

    // Set CORS headers
    const response = NextResponse.json({ message: 'Success' });
    response.headers.set('Access-Control-Allow-Origin', 'https://customcases-uk.vercel.app'); // Adjust according to your needs
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Authentication error:', error);
    const response = NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', '*'); // Adjust according to your needs
    return response;
  }
}
