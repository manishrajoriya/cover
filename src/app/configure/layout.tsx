import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Steps from '@/components/Steps'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <MaxWidthWrapper className='flex-1 flex flex-col'>
      <Steps/>
        {children}
    </MaxWidthWrapper>
  )
}

export default layout