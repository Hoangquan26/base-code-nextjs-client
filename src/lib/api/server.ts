import { cookies } from 'next/headers'
import { apiBaseFetch } from './http'

const API_URL = process.env.API_URL!

export async function apiServerFetch<T>(
    path: string,
    options: RequestInit = {}
) {
    const myCookie = await cookies()
    const token = myCookie.get('access_token')?.value

    return apiBaseFetch<T>(API_URL + path, {
        ...options,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ...options.headers,
        },
        cache: 'no-store',
    })
}
