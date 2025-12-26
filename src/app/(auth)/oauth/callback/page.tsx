'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthActions } from '@/stores/auth/auth.action'
import AppLoading from '@/components/shared/app-loading/app-loading'

export default function OAuthCallbackPage() {
    const params = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            try {
                AuthActions.hydrateFromCallback(params)
            } catch {
                router.replace('/login')
                return
            }

            try {
                await AuthActions.fetchMe()
            } catch {
                // ignore profile load errors, still redirect to dashboard
            }

            router.replace('/dashboard')
        }

        handleCallback()
    }, [params, router])

    return (
        <AppLoading />
    )
}
