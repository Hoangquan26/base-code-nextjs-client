import { AuthSession, AuthUser } from '@/modules/auth.module'
import { useAuthStore } from './auth.store'
import { apiClientFetch } from '@/lib/api/client'
import { authApiRoute, authService } from '@/services/auth.service'

type LoginPayload = {
    email: string
    password: string
}

type OAuthProvider = 'google' | 'facebook'
type OAuthMode = 'redirect' | 'popup'

const isAuthUser = (value: unknown): value is AuthUser => {
    return Boolean(value) && typeof value === 'object' && 'id' in value
}

const isAuthSession = (value: unknown): value is AuthSession => {
    return Boolean(value) && typeof value === 'object' && 'user' in value
}

export const AuthActions = {
    async login(payload: LoginPayload) {
        const data = await apiClientFetch<AuthSession>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        })

        useAuthStore.getState().setAuth(data)
        if (!data.user) {
            await AuthActions.fetchMe()
        }
        return data
    },

    async fetchMe() {
        const data = await authService.me()
        const store = useAuthStore.getState()

        if (isAuthSession(data)) {
            if (data.user) {
                store.setUser(data.user)
                return data.user
            }
            return null
        }

        if (isAuthUser(data)) {
            store.setUser(data)
            return data
        }

        return null
    },

    async refresh() {
        const { refreshToken } = useAuthStore.getState()
        if (!refreshToken) throw new Error('No refresh token')

        const data = await apiClientFetch<AuthSession>('/auth/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
        })

        useAuthStore.getState().setTokens(data)
        useAuthStore.getState().setUser(data.user)
        return data
    },

    async logout() {
        try {
            await apiClientFetch('/auth/logout', { method: 'POST' })
        } catch {
            // ignore backend error
        } finally {
            useAuthStore.getState().clearAuth()
        }
    },

    oauth(
        provider: OAuthProvider,
        mode: OAuthMode = 'redirect'
    ) {
        const BASE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PREFIX}`
        if (!BASE_API_URL) throw new Error('Oauth endpoint chưa được cài đặt')
        const url = BASE_API_URL + authApiRoute[provider]()

        if (mode === 'popup') {
            const popup = window.open(
                url,
                'oauth-login',
                'width=500,height=600'
            )
            if (!popup) {
                throw new Error('Popup blocked')
            }
        } else {
            window.location.href = url
        }
    },

    /**
     * Hydrate auth store from OAuth callback
     */
    hydrateFromCallback(params: URLSearchParams) {
        const accessToken = params.get('accessToken')
        const refreshToken = params.get('refreshToken')
        const expiresIn = Number(params.get('expiresIn'))

        if (!accessToken || !refreshToken) {
            throw new Error('Invalid OAuth callback')
        }

        const session: AuthSession = {
            accessToken,
            refreshToken,
            expiresIn,
            tokenType: 'Bearer',
            user: null,
        }

        useAuthStore.getState().setAuth(session)
    },
}
