import { OAUTH2_REDIRECT_URI } from "../constants"
import { getCookie, getInitials } from "../lib/utils"
import {
  EventDataType,
  ResetPasswordArgs,
  TicketDataType,
  UserLoginObj,
  UserRegisterObj,
} from "../types"
import axios from "axios"
import qs from "qs"
import axiosInstance from "./axios-interceptor"

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
    url: `${baseUrl}/api/v1/auth/signup`,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic dGlrb21hdGF0YTpkR2wwYVM1dFlYUmhkR0V6TWpjek9DWWhKVUJlUUE9PQ==",
    },
  }
  try {
    const response = await axios.request(config)
    return response?.data
  } catch (error: any) {
    return error?.response?.data
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
    return response?.data
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
    return response
  } catch (error: any) {
    return error
  }
}

export const resetPassword = async (payload: ResetPasswordArgs) => {
  const data = JSON.stringify(payload)
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/auth/update-password`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic dGlrb21hdGF0YTpkR2wwYVM1dFlYUmhkR0V6TWpjek9DWWhKVUJlUUE9PQ==",
    },
    data: data,
  }
  try {
    const response = await axios.request(config)
    return response
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getUserInfo = async () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/auth/user-info`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  }
  try {
    const response = await axiosInstance.request(config)
    return response?.data
  } catch (error: any) {
    return error
  }
}

export const getUserAvatarAndInitials = async () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/auth/user-info`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  }
  try {
    const response = await axiosInstance.request(config)
    if (response?.data.status === 200) {
      return {
        imageUrl: response?.data?.data?.imageUrl,
        initials: getInitials(response?.data?.data?.fullName),
      }
    }
  } catch (error: any) {
    return error
  }
}

export const createEventFn = async (eventData: EventDataType) => {
  const eventPoster: File = eventData?.poster?.[0]
  const payload = JSON.stringify(eventData)

  const data = new FormData()
  data.append("payload", new Blob([payload], { type: "application/json" }))
  data.set("Content-Type", "application/json")

  data.append("file", eventPoster, "poster")

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
    const response = await axiosInstance.post(config.url, data, config)
    return response
  } catch (error: any) {
    return error
  }
}

export const fetchUserEventsFn = async (page = 0, size = 5) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/event/all-user?size=${size}&page=${page}`,
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  }

  try {
    const response = await axiosInstance.request(config)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    return error
  }
}

export const createTicketFn = async (ticketData: TicketDataType) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/ticket/create`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    data: JSON.stringify(ticketData),
  }

  try {
    const response = await axiosInstance.request(config)
    return response
  } catch (error: any) {
    return error
  }
}

export const fetchEventTicketsFn = async (eventId: string | undefined, page = 0, size = 5) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/ticket/event/${eventId}?page=${page}&size=${size}`,
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  }

  try {
    const response = await axiosInstance.request(config)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    return error
  }
}
