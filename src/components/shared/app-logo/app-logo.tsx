'use client'
import { useIsMobile } from '@/hooks/use-mobile'
import Image from 'next/image'
import React from 'react'

const LOGO_IMAGE_PATH = '/logo/logo-vicenza.png'
export default function AppLogo() {
    const isMobile = useIsMobile()

    return (
        isMobile ? <Image src={LOGO_IMAGE_PATH} alt="Logo" width={32} height={32} /> : <Image src={LOGO_IMAGE_PATH} alt="Logo" width={64} height={64} />
    )
}
