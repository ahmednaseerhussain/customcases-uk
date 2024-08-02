// pages/api/auth-callback.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuthStatus } from './actions' // Import the function from the server-side logic

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await getAuthStatus(req, res)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default handler
