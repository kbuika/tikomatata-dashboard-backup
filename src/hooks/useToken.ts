import { useState } from "react"

const useToken = () => {
  const getToken = (): string | undefined => {
    const tokenString = sessionStorage.getItem("token")
    const userToken: string | null = tokenString
    return userToken || undefined
  }

  const [token, setToken] = useState<string | undefined>(getToken())

  const saveToken = (userToken: string) => {
    sessionStorage.setItem("token", userToken)
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token,
  }
}

export default useToken
