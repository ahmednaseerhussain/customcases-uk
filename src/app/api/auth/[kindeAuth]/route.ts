import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const GET = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://customcases-uk.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
  
    return handleAuth()(req, res);
  };