"use client"

import React from "react"
import AppLoading from "@/components/shared/app-loading/app-loading"
import { useGuestGuard } from "@/hooks/use-guest-guard"

type GuestGuardProps = {
    children: React.ReactNode
    fallback?: React.ReactNode
    redirectTo?: string
}

export default function GuestGuard({
    children,
    fallback,
    redirectTo,
}: GuestGuardProps) {
    const { isReady, isGuest } = useGuestGuard({ redirectTo })

    const resolvedFallback =
        fallback !== undefined ? fallback : <AppLoading />

    if (!isReady) {
        return <>{resolvedFallback}</>
    }

    if (!isGuest) {
        return null
    }

    return <>{children}</>
}
