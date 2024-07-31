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

    return new NextResponse('Success', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://customcases-uk.vercel.app',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  } catch (error) {
    console.error('Internal Server Error:', error as Error);
    return new NextResponse(`Internal Server Error: ${(error as Error).message}`, { status: 500 });
  }
};
