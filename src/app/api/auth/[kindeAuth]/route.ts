import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) => {
  const res = NextResponse.next();
  res.headers.set('Access-Control-Allow-Origin', 'https://customcases-uk.vercel.app');
  res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200 });
  }

  return handleAuth()(req, res);
};
