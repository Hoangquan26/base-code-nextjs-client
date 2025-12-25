export class ApiError extends Error {
    status: number
    code?: string

    constructor(message: string, status: number, code?: string) {
        super(message)
        this.status = status
        this.code = code
    }
}

export async function parseApiError(
    res: Response
): Promise<ApiError> {
    let body: any = {}
    try {
        body = await res.json()
    } catch { }

    return new ApiError(
        body?.message || res.statusText || 'Request error',
        res.status,
        body?.code
    )
}