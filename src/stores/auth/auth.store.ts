import { AUTH_INITIAL_STATE, AuthSession, AuthTokens, AuthUser } from '@/modules/auth.module'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type AuthStore = AuthSession & {
    setAuth: (payload: AuthSession) => void
    setUser: (user: AuthUser | null) => void
    updateUser: (payload: Partial<AuthUser>) => void
    setTokens: (payload: Partial<AuthTokens>) => void
    clearAuth: () => void
}

const storage = createJSONStorage(() => {
    if (typeof window === 'undefined') {
        return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined,
        }
    }
    return window.localStorage
})

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            ...AUTH_INITIAL_STATE,

            setAuth: (payload) => {
                set({ ...payload })
            },

            setUser: (user) => {
                set({ user })
            },

            updateUser: (payload) => {
                const current = get().user
                if (!current) return
                set({ user: { ...current, ...payload } })
            },

            setTokens: (payload) => {
                const current = get()
                set({
                    accessToken: payload.accessToken ?? current.accessToken,
                    refreshToken: payload.refreshToken ?? current.refreshToken,
                    tokenType: payload.tokenType ?? current.tokenType,
                    expiresIn: payload.expiresIn ?? current.expiresIn,
                })
            },

            clearAuth: () => {
                set({ ...AUTH_INITIAL_STATE })
            },
        }),
        {
            name: 'auth-store',
            storage,
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                tokenType: state.tokenType,
                expiresIn: state.expiresIn,
            }),
        }
    )
)
