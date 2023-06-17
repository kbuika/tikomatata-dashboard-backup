import { useState } from "react"

interface UserToken {
  token: string
}

const useToken = () => {
  const getToken = (): string | undefined => {
    const tokenString = sessionStorage.getItem("token")
    const userToken: UserToken | null = JSON.parse(tokenString || "{}")
    return userToken?.token
  }

  const [token, setToken] = useState<string | undefined>(getToken())

  const saveToken = (userToken: string | UserToken) => {
    if (typeof userToken === "string") {
      sessionStorage.setItem("token", userToken)
      setToken(userToken)
    } else {
      sessionStorage.setItem("token", JSON.stringify(userToken))
      setToken(userToken.token)
    }
  }

  return {
    setToken: saveToken,
    token,
  }
}

export default useToken
