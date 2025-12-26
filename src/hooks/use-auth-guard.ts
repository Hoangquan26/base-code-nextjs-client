"use client"

import { useLayoutEffect, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthHydrated } from "@/hooks/use-auth-hydrated"
import {
    hasAllRoles,
    hasAnyRole,
    useAuthRoles,
    useIsAuthenticated,
} from "@/stores/auth/auth.selector"

type AuthGuardOptions = {
    redirectTo?: string
    redirectUnauthorizedTo?: string
    roles?: string[]
    requireAllRoles?: boolean
}

export function useAuthGuard(options: AuthGuardOptions = {}) {
    const {
        redirectTo = "/login",
        redirectUnauthorizedTo = "/not-found",
        roles,
        requireAllRoles = false,
    } = options

    const router = useRouter()
    const pathname = usePathname()
    const hydrated = useAuthHydrated()
    const isAuthenticated = useIsAuthenticated()
    const userRoles = useAuthRoles()

    const hasRoleAccess = useMemo(() => {
        if (!roles || roles.length === 0) return true
        return requireAllRoles
            ? hasAllRoles(userRoles, roles)
            : hasAnyRole(userRoles, roles)
    }, [requireAllRoles, roles, userRoles])

    useLayoutEffect(() => {
        if (!hydrated) return
        if (!isAuthenticated) {
            if (pathname !== redirectTo) {
                router.replace(redirectTo)
            }
            return
        }

        if (!hasRoleAccess && pathname !== redirectUnauthorizedTo) {
            router.replace(redirectUnauthorizedTo)
        }
    }, [
        hydrated,
        isAuthenticated,
        hasRoleAccess,
        redirectTo,
        redirectUnauthorizedTo,
        router,
        pathname,
    ])

    return {
        isReady: hydrated,
        isAllowed: hydrated && isAuthenticated && hasRoleAccess,
        isAuthenticated,
        hasRoleAccess,
    }
}
