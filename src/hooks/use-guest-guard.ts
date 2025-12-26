"use client"

import { useLayoutEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthHydrated } from "@/hooks/use-auth-hydrated"
import { useIsAuthenticated } from "@/stores/auth/auth.selector"

type GuestGuardOptions = {
    redirectTo?: string
}

export function useGuestGuard(options: GuestGuardOptions = {}) {
    const { redirectTo = "/dashboard" } = options
    const router = useRouter()
    const pathname = usePathname()
    const hydrated = useAuthHydrated()
    const isAuthenticated = useIsAuthenticated()

    useLayoutEffect(() => {
        if (!hydrated) return
        if (isAuthenticated && pathname !== redirectTo) {
            router.replace(redirectTo)
        }
    }, [hydrated, isAuthenticated, redirectTo, router, pathname])

    return {
        isReady: hydrated,
        isGuest: hydrated && !isAuthenticated,
    }
}
