import { LoginType } from '@/forms/login/login.init'
import { RegisterType } from '@/forms/register/register.init'
import { ApiErrorResponse, ApiResponse } from '@/lib/api/api.type'
import { apiClientFetch } from '@/lib/api/client'
import { AuthSession } from '@/modules/auth.module'

export const authApiRoute = {
    login: () => '/auth/login',
    register: () => '/auth/register',
    me: () => '/auth/me',
    facebook: () => '/auth/facebook',
    google: () => '/auth/google',
}

export const authService = {
    login(payload: LoginType) {
        return apiClientFetch<ApiResponse<AuthSession> | ApiErrorResponse>(
            authApiRoute.login(),
            {
                method: 'POST',
                body: JSON.stringify(payload),
            }
        )
    },

    register(payload: Omit<RegisterType, 'confirmPassword'>) {
        return apiClientFetch<ApiResponse<AuthSession> | ApiErrorResponse>(
            authApiRoute.register(),
            {
                method: 'POST',
                body: JSON.stringify(payload),
            }
        )
    },

    me() {
        return apiClientFetch<ApiResponse<AuthSession> | ApiErrorResponse>(
            authApiRoute.me(),
            {
                method: 'GET',
            }
        )
    },
}
