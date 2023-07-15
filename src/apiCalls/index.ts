import { OAUTH2_REDIRECT_URI } from "../constants"
import { getCookie } from "../lib/utils"
import { EventDataType, UserLoginObj, UserRegisterObj } from "../types"
import axios from "axios"
import qs from "qs"

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
  const data = qs.stringify({
    username: user?.email,
    pin: user?.password,
    grant_type: "password",
  })
  const config = {
    method: "post",
    url: `${baseUrl}/api/v1/auth/token/pin?redirect_uri=${OAUTH2_REDIRECT_URI}`,
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic dGlrb21hdGF0YTpkR2wwYVM1dFlYUmhkR0V6TWpjek9DWWhKVUJlUUE9PQ==",
    },
  }
  try {
    const response = await axios.request(config)
    return response
  } catch (error: any) {
    return error
  }
}

export const forgetPassord = async (email: string) => {
  const data = JSON.stringify({
    email: email,
  })
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/auth/forget-password`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic dGlrb21hdGF0YTpkR2wwYVM1dFlYUmhkR0V6TWpjek9DWWhKVUJlUUE9PQ==",
    },
    data: data,
  }
  try {
    const response = await axios.request(config)
    console.log("response", response)
    return response
  } catch (error: any) {
    return error
  }
}

export const createEventFn = async (eventData: EventDataType) => {
  const eventPoster: File = eventData?.poster?.[0]
  const payload = JSON.stringify(eventData)

  eventData = {
    ...eventData,
    startTime: "10:00:00",
    endTime: "18:00:00",
  }

  console.log(eventPoster, "event poster")
  console.log("event data", eventData)

  const data = new FormData()
  data.append("payload", new Blob([payload], { type: "application/json" }))
  data.set("Content-Type", "application/json")

  data.append("file", eventPoster, "poster")

  console.log("from data", data)
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/event/create`,
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      "Content-Type": "multipart/form-data", // Updated header value
    },
  }

  try {
    const response = await axios.post(config.url, data, config)
    return response
  } catch (error: any) {
    return error
  }
}
