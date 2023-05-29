import { useState, useEffect } from "react"
import { ACCESS_TOKEN } from "../constants"
import { redirect } from "react-router-dom"

const OAuth2RedirectHandler = ({ props }: any) => {
  const [token, setToken] = useState<string>("")
  const [, setError] = useState<string>("")
  useEffect(() => {
    const token = getUrlParameter("token")
    const error = getUrlParameter("error")
    setToken(token)
    setError(error)
  }, [])

  const getUrlParameter = (name: string) => {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]")
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
    const results = regex.exec(props?.location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, "  "))
  }

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token)
    redirect("/example")
  } else {
    redirect("/")
  }
}

export default OAuth2RedirectHandler
