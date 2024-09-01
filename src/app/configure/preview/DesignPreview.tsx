'use client'
import Phone from '@/components/Phone'
import { cn } from '@/lib/utils'
import { COLORS } from '@/validators/options-validator'
import { Configuration } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Confetti from "react-dom-confetti"

const DesignPreview = ({configration}: {configration: Configuration}) => {
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        setShowConfetti(true)
    }, [])

    const {color} = configration
    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw
  return (
    <>
    <div
     aria-hidden="true"
    className='pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center'>
        <Confetti active={showConfetti} config={{elementCount: 200, spread: 90}}/>
    </div>

    <div className='mt-20 grid grid-cols-2 gap-4 text-sm sm:grid-cols-12 sm:gap-x-6 sm:grid-rows-1 md:gap-x-8 lg:gap-x-12'>
        <div className='sm:col-span-4 sm:row-span-2 md:col-span-3 md:row-span-1'>
          <Phone 
          className={cn(`bg-${tw}`)}
          imgSrc={configration.croppedImageUrl!}/>
        </div>
    </div>
    </>
  )
}

export default DesignPreview