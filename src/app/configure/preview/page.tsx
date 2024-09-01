import { db } from '@/db'
import { notFound } from 'next/navigation'
import React from 'react'
import DesignPreview from './DesignPreview'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const page = async ({searchParams}: PageProps) => {
    const {id} = searchParams

    if(!id || typeof id !== 'string') {
        return notFound()
    }

    const configration = await db.configuration.findUnique({
        where: {
            id
        }
    })

    if(!configration) {
        return notFound()
    }
  return (
    <DesignPreview configration={configration} />
  )
}

export default page