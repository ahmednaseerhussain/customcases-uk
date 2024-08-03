import { NextApiRequest, NextApiResponse } from 'next';
import allowCors from '../../../../lib/cors'; // Adjust the path according to your directory structure
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authFunction = handleAuth();
    await authFunction(req, res);

    if (req.method === 'GET') {
      res.status(200).json({ message: 'Success' });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).end('Internal Server Error');
  }
};

// Apply allowCors to authHandler and export it directly
const handler = allowCors(authHandler);

export default handler;
