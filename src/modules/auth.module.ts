export type AuthUser = {
  id: string
  email?: string | null
  name?: string | null
  roles?: string[]
}

export type AuthTokens = {
  accessToken: string | null
  refreshToken: string | null
  tokenType: string
  expiresIn: number | null
}

export type AuthSession = {
  user: AuthUser | null
} & AuthTokens

export const AUTH_INITIAL_STATE: AuthSession = {
  user: null,
  accessToken: null,
  refreshToken: null,
  tokenType: 'Bearer',
  expiresIn: null,
}
