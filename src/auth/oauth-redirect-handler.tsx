import { useEffect } from "react"
import { ACCESS_TOKEN } from "../constants"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../lib/utils"

interface IOAuth2RedirectHandlerProps {
  setToken: (userToken: string) => void
}

const OAuth2RedirectHandler = ({ setToken }: IOAuth2RedirectHandlerProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token")
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token)
      setCookie(ACCESS_TOKEN, token)
      setToken(token)
      navigate("/events")
    }
    // TODO: Handle errors
  }, [])

  return null
}

export default OAuth2RedirectHandler
