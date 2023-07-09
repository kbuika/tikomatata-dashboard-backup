import { OAUTH2_REDIRECT_URI } from "../constants"
import { EventDataType, UserLoginObj, UserRegisterObj } from "../types"
import axios from "axios"

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const registerUser = async (user: UserRegisterObj) => {
  const data = JSON.stringify({
    fullName: user?.fullName,
    phone: user?.phone,
    email: user?.email,
    password: user?.password,
  })
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
    return response.data
  } catch (error: any) {
    return error.response?.data?.data
  }
}

export const loginUser = async (user: UserLoginObj) => {
  const data = JSON.stringify({
    email: user?.email,
    password: user?.password,
    grant_type: "password",
  })
  console.log(data)
  const config = {
    method: "post",
    url: `https://cors-anywhere.herokuapp.com/${baseUrl}/api/v1/auth/token/pin?redirect_uri=${OAUTH2_REDIRECT_URI}`,
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
    console.log(error)
    return error.response?.data?.data
  }
}

export const createEvent = async (eventData: EventDataType) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/event/create`,
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ0aWtvbWF0YXRhX29yZ2FuaXplcnMiLCJuYmYiOjE2ODgyMTg4NDQsInVzZXJfbmFtZSI6ImphbmUuZG9lQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2ODgyMjA2NDQsImlhdCI6MTY4ODIxODg0NCwianRpIjoiOTFmYzYzNTUtMWEzYS00MWM4LTg5OWUtOTIzYTE5NDA1Mjk0IiwiY2xpZW50X2lkIjoidGlrb21hdGF0YSIsImF1dGhvcml0aWVzIjpbIlJPTEVfT1JHQU5JWkVSIl19.AmIQPtU2wJkQecTbKBCYiv35EjD0lUHws4tSEDDlIl8f9PeGPkALWKdYftSwk8nEZrl9m_0eU7DvbWOS2EL8f9_Tuwidnc1aM8VI6OzvUjO5zfpamyDY68G2TAL11HGz8nzgWfX_WOY1lFzvP5r85wrq0W8AYqfKAd2CDIBgVsFmCV0Via8vJxe0zAaDDIKy073rK0k0sx0x0vOPzlLhZU82zY4WUfaN3_3hfP3lfHHwq9l83i_gR60mdoiIFslRACOh3FJtXA72OUqMFPr3lwRpkxMIlEWKU_cLCZM-iAPiIaR-6b8n_W8It3x_lntNI9v6FvP5M4bDScGm_7tFQw",
      "Content-type": "application/json",
    },
    data: {
      createEventRequest: eventData,
      filePart: eventData?.poster,
    },
  }

  try {
    const response = await axios.request(config)
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response?.data?.data
  }
}
