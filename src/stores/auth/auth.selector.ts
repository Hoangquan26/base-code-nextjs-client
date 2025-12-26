import { useAuthStore } from './auth.store'

type RoleList = string[] | undefined | null
const EMPTY_ROLES: string[] = []

export const useAuthUser = () =>
    useAuthStore((s) => s.user)

export const useIsAuthenticated = () =>
    useAuthStore((s) => !!s.accessToken)

export const useAuthTokens = () =>
    useAuthStore((s) => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        tokenType: s.tokenType,
    }))

export const useAuthRoles = () =>
    useAuthStore((s) => s.user?.roles ?? EMPTY_ROLES)

export const normalizeRoles = (roles: RoleList) => roles ?? EMPTY_ROLES

export const hasRole = (roles: RoleList, role: string) =>
    normalizeRoles(roles).includes(role)

export const hasAnyRole = (roles: RoleList, required: string[]) => {
    if (required.length === 0) return true
    const current = normalizeRoles(roles)
    return required.some((role) => current.includes(role))
}

export const hasAllRoles = (roles: RoleList, required: string[]) => {
    if (required.length === 0) return true
    const current = normalizeRoles(roles)
    return required.every((role) => current.includes(role))
}

export const useHasRole = (role: string) =>
    useAuthStore((s) => hasRole(s.user?.roles, role))

export const useHasAnyRole = (roles: string[]) =>
    useAuthStore((s) => hasAnyRole(s.user?.roles, roles))

export const useHasAllRoles = (roles: string[]) =>
    useAuthStore((s) => hasAllRoles(s.user?.roles, roles))
