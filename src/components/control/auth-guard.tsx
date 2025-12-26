"use client"

import React from "react"
import AppLoading from "@/components/shared/app-loading/app-loading"
import { useAuthGuard } from "@/hooks/use-auth-guard"

type AuthGuardProps = {
    children: React.ReactNode
    fallback?: React.ReactNode
    redirectTo?: string
    redirectUnauthorizedTo?: string
    roles?: string[]
    requireAllRoles?: boolean
}

export default function AuthGuard({
    children,
    fallback = <AppLoading />,
    redirectTo,
    redirectUnauthorizedTo,
    roles,
    requireAllRoles,
}: AuthGuardProps) {
    const { isReady, isAllowed } = useAuthGuard({
        redirectTo,
        redirectUnauthorizedTo,
        roles,
        requireAllRoles,
    })

    const resolvedFallback =
        fallback !== undefined ? fallback : <AppLoading />

    if (!isReady) {
        return <>{resolvedFallback}</>
    }

    if (!isAllowed) {
        return null
    }

    return <>{children}</>
}
