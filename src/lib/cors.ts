import cors, { runMiddleware } from '../../../lib/cors';

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  res.status(200).json({ message: 'Logout successful!' });
}
