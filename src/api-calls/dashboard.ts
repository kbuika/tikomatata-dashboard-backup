import { getCookie } from "../lib/utils"
import axiosInstance from "./axios-interceptor"

interface ITotalTransactions {
    eventId: string | undefined
    page?: number
    size?: number
}

const baseUrl = import.meta.env.VITE_API_BASE_URL


export const getTotalSales = async (eventId: string | undefined) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/v1/ticket/total-sales?eventId=${eventId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
    try {
      const response = await axiosInstance.request(config)
      if (response.status === 200) {
        return response.data
      }
    } catch (error: any) {
      return error
    }
  }

  export const getTransactionsForEvent = async ({eventId, page=0, size=10}: ITotalTransactions) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/v1/ticket/transactions?eventId=${eventId}&page=${page}&size=${size}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
    try {
      const response = await axiosInstance.request(config)
      if (response.status === 200) {
        return response.data
      }
    } catch (error: any) {
      return error
    }
  }

  export const getAttendeesForEvent = async ({eventId, page=0, size=10}: ITotalTransactions) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/v1/ticket/attendees?eventId=${eventId}&page=${page}&size=${size}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
    try {
      const response = await axiosInstance.request(config)
      if (response.status === 200) {
        return response.data
      }
    } catch (error: any) {
      return error
    }
  }