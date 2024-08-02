// server/actions.ts
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export const getAuthStatus = async (req?: NextApiRequest, res?: NextApiResponse) => {
  if (req && res) {
    // Handling API route scenario
    res.setHeader('Access-Control-Allow-Origin', 'https://customcases-uk.vercel.app')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      return res.status(200).end()
    }
  }

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id || !user.email) {
    throw new Error('Invalid user data')
  }

  const existingUser = await db.user.findFirst({
    where: { id: user.id },
  })

  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    })
  }

  if (res) {
    res.status(200).json({ success: true })
  }

  return { success: true }
}
