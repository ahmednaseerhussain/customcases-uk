import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://customcases-uk.vercel.app',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    const res = NextResponse.next();
    res.headers.set('Access-Control-Allow-Origin', 'https://customcases-uk.vercel.app');
    res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return handleAuth()(req, res);
  } catch (error) {
    console.error('Internal Server Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
