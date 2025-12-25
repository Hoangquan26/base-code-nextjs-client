import { useAuthStore } from './auth.store'

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
    useAuthStore((s) => s.user?.roles ?? [])
