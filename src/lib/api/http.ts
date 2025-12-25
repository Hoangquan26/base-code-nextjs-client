import { parseApiError } from "./error"

export type ApiBaseOptions = RequestInit & {
    params?: Record<string, string | number | undefined>
}

export async function apiBaseFetch<T>(
    url: string,
    options: ApiBaseOptions = {}
): Promise<T> {
    const { params, headers, ...rest } = options

    const query = params
        ? '?' +
        new URLSearchParams(
            Object.entries(params)
                .filter(([, v]) => v !== undefined)
                .map(([k, v]) => [k, String(v)])
        )
        : ''

    const res = await fetch(url + query, {
        ...rest,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    })

    if (!res.ok) {
        throw await parseApiError(res)
    }

    const json = await res.json()
    if (json?.success === false) {
        throw new Error(json.message || 'API error')
    }

    return json.data
}
