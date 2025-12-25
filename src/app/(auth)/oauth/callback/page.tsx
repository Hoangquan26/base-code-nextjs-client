'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthActions } from '@/stores/auth/auth.action'

export default function OAuthCallbackPage() {
    const params = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        try {
            AuthActions.hydrateFromCallback(params)
            router.replace('/dashboard')
        } catch (e) {
            router.replace('/login')
        }
    }, [])

    return (
        <div className="flex h-screen items-center justify-center">
            <p>Đang đăng nhập...</p>
        </div>
    )
}
