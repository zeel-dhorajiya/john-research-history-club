'use client'

/**
 * This route is responsible for rendering the Sanity Studio.
 * It's nested in the /studio path of your Next.js app.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
    return <NextStudio config={config} />
}
