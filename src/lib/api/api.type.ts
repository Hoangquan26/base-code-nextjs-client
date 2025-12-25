export type ApiResponse<T> = {
    success: true
    data: T
    meta?: {
        requestId?: string
        timestamp?: string
    }
}

export type ApiErrorResponse = {
    success: false
    code: string
    message: string
    meta?: {
        requestId?: string
        timestamp?: string
    }
}
