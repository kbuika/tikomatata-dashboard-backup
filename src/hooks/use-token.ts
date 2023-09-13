import { useState } from "react"
import { getCookie, setCookie } from "../lib/utils"
import { ACCESS_TOKEN } from "../constants"

const useToken = () => {
  const getToken = (): string | undefined => {
    const tokenString = getCookie(ACCESS_TOKEN)
    const userToken: string | undefined = tokenString
    return userToken || undefined
  }

  const [token, setToken] = useState<string | undefined>(getToken())

  const saveToken = (userToken: string) => {
    setCookie(ACCESS_TOKEN, userToken)
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token,
  }
}

export default useToken
