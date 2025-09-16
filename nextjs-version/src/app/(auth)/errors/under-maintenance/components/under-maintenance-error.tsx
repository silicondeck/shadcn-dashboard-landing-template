"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function UnderMaintenanceError() {
  const router = useRouter()

  return (
    <div className='mx-auto flex min-h-dvh flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16'>
      <Image
        src='https://ui.shadcn.com/placeholder.svg'
        alt='placeholder image'
        width={960}
        height={540}
        className='aspect-video w-240 rounded-xl object-cover dark:brightness-[0.95] dark:invert'
      />
      <div className='text-center'>
        <h1 className='mb-4 text-3xl font-bold'>503</h1>
        <h2 className="mb-3 text-2xl font-semibold">Under Maintenance</h2>
        <p>The service is currently unavailable. Please try again later.</p>
        <div className='mt-6 flex items-center justify-center gap-4 md:mt-8'>
          <Button className='cursor-pointer' onClick={() => router.push('/dashboard')}>Go Back Home</Button>
          <Button variant='outline' className='flex cursor-pointer items-center gap-1' onClick={() => router.push('#')}>
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  )
}
