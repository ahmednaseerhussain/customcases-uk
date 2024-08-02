'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const configurationId = localStorage.getItem('configurationId')
    if (configurationId) setConfigId(configurationId)
  }, [])

  const { data, isLoading, error } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => {
      const response = await fetch('/api/auth-callback')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    retry: true,
    retryDelay: 500,
  })

  useEffect(() => {
    if (data?.success) {
      if (configId) {
        localStorage.removeItem('configurationId')
        router.push(`/configure/preview?id=${configId}`)
      } else {
        router.push('/')
      }
    }
  }, [data, configId, router])

  if (isLoading) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
          <h3 className='font-semibold text-xl'>Logging you in...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='font-semibold text-xl'>Error logging you in</h3>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  return null
}

export default Page
