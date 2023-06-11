import { useEffect } from "react"
import { ACCESS_TOKEN } from "../constants"
import { useNavigate } from "react-router-dom"

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token")
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token)
      navigate("/events")
    }
    // TODO: Handle errors
  }, [])

  return <></>
}

export default OAuth2RedirectHandler
