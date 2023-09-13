export const API_BASE_URL = import.meta.env.API_BASE_URL
export const ACCESS_TOKEN = "accessToken"

export const OAUTH2_REDIRECT_URI = `${window.location.origin}/oauth2/redirect`

export const GOOGLE_AUTH_URL =
  import.meta.env.VITE_API_BASE_URL +
  "/oauth2/authorization/google?redirect_uri=" +
  OAUTH2_REDIRECT_URI
