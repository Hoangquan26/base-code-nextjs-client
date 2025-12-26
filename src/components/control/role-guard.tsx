"use client"

import React from "react"
import {
    hasAllRoles,
    hasAnyRole,
    useAuthRoles,
} from "@/stores/auth/auth.selector"

type RoleGuardProps = {
    children: React.ReactNode
    roles: string[] | string
    requireAll?: boolean
    fallback?: React.ReactNode
}

export default function RoleGuard({
    children,
    roles,
    requireAll = false,
    fallback = null,
}: RoleGuardProps) {
    const userRoles = useAuthRoles()
    const requiredRoles = Array.isArray(roles) ? roles : [roles]
    const isAllowed = requireAll
        ? hasAllRoles(userRoles, requiredRoles)
        : hasAnyRole(userRoles, requiredRoles)

    if (!isAllowed) {
        return <>{fallback}</>
    }

    return <>{children}</>
}
