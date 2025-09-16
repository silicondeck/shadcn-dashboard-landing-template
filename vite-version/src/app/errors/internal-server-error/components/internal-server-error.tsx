"use client"

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function InternalServerError() {
  const navigate = useNavigate()

  return (
    <div className='mx-auto flex min-h-dvh flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16'>
      <img
        src='https://ui.shadcn.com/placeholder.svg'
        alt='placeholder image'
        className='aspect-video w-240 rounded-xl object-cover dark:brightness-[0.95] dark:invert'
      />
      <div className='text-center'>
        <h1 className='mb-4 text-3xl font-bold'>500</h1>
        <h2 className="mb-3 text-2xl font-semibold">Internal Server Error</h2>
        <p>Something went wrong on our end. We're working to fix the issue. Please try again later.</p>
        <div className='mt-6 flex items-center justify-center gap-4 md:mt-8'>
          <Button className='cursor-pointer' onClick={() => navigate('/dashboard')}>Go Back Home</Button>
          <Button variant='outline' className='flex cursor-pointer items-center gap-1' onClick={() => navigate('')}>
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  )
}
