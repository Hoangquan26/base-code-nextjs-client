'use client'

import { apiBaseFetch } from "./http"
import { ApiError } from "./error"
import { AuthActions } from "@/stores/auth/auth.action"
import { useAuthStore } from "@/stores/auth/auth.store"
import { configuration } from "@/config/configuration"


const API_URL = configuration.app.API_URL!
const API_PREFIX = configuration.app.API_PREFIX
let isRefreshing = false
let refreshPromise: Promise<any> | null = null

export async function apiClientFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const state = useAuthStore.getState()
    const token = state.accessToken

    try {
        const BASE_URL = API_URL + API_PREFIX + (path.startsWith('/') ? path : '/' + path)
        return await apiBaseFetch<T>(BASE_URL, {
            ...options,
            headers: {
                Authorization: token
                    ? `${state.tokenType} ${token}`
                    : '',
                ...options.headers,
            },
            credentials: 'include',
        })
    } catch (err) {
        if (
            err instanceof ApiError &&
            err.status === 401 &&
            state.refreshToken
        ) {
            if (!isRefreshing) {
                isRefreshing = true
                refreshPromise = AuthActions.refresh().finally(() => {
                    isRefreshing = false
                })
            }

            try {
                await refreshPromise
                const retryState = useAuthStore.getState()

                return await apiBaseFetch<T>(API_URL + path, {
                    ...options,
                    headers: {
                        Authorization: retryState.accessToken
                            ? `${retryState.tokenType} ${retryState.accessToken}`
                            : '',
                        ...options.headers,
                    },
                    credentials: 'include',
                })
            } catch {
                await AuthActions.logout()
                throw err
            }
        }

        throw err
    }
}
