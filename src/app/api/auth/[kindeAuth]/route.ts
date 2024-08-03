import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import allowCors from '../../../../lib/cors'; // Adjust the path according to your directory structure
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';


const router = createRouter<NextApiRequest, NextApiResponse>();

// Middleware to handle auth
router.use(async (req, res, next) => {
  const authFunction = handleAuth();
  try {
    await authFunction(req, res);
    next(); // Call next without arguments for regular flow
  } catch (error) {
    // If error handling is needed, you can pass it to default error handler
    next(); // Ensure this is only used if you have an error handler in place
  }
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  allowCors((req, res) => router.run(req, res))(req, res);
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    handler(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
