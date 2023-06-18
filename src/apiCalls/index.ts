import { UserRegisterObj } from "../types"
import axios from "axios"

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const registerUser = async (user: UserRegisterObj) => {
  const data = JSON.stringify({
    fullName: user?.fullName,
    phone: user?.phone,
    email: user?.email,
    password: user?.password,
  })
  console.log(data)
  const config = {
    method: "post",
    url: `https://cors-anywhere.herokuapp.com/${baseUrl}/api/v1/auth/signup`,
    data,
    headers: {
      "Content-type": "application/json",
    },
  }
  try {
    const response = await axios.request(config)
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.log(error.response?.data?.data)
    return error.response?.data?.data
  }
}
