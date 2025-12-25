export const configuration = {
    app: {
        API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9999',
        API_PREFIX: process.env.NEXT_PUBLIC_API_PREFIX ?? '/api'
    }
}