import moment from "moment"
import { getCookie } from "../lib/utils"
import axiosInstance from "./axios-interceptor"

interface ITotalTransactions {
  eventId: string | undefined
  page?: number
  size?: number
}

interface SalesInPeriod {
  eventId: string | undefined
  selectedPeriod: {
    startDate: string
    endDate: string
  }
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

export const getTotalTicketSalesByType = async (eventId: string | undefined) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/v1/ticket/sales?eventId=${eventId}`,
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

export const getTransactionsForEvent = async ({
  eventId,
  page = 0,
  size = 10,
}: ITotalTransactions) => {
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

export const getAttendeesForEvent = async ({
  eventId,
  page = 0,
  size = 10,
}: ITotalTransactions) => {
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

export const getSuccessfulSalesInPeriod = async ({
  eventId,
  selectedPeriod = {
    startDate: moment().clone().subtract(14, "days").format("YYYY-MM-DD"),
    endDate: moment().endOf("day").format("YYYY-MM-DD"),
  },
}: SalesInPeriod) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseUrl}/api/v1/ticket/successful-sales?eventId=${eventId}&startDate=${selectedPeriod.startDate}&endDate=${selectedPeriod.endDate}`,
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

export const getAllPageViews = async ({
  eventId,
  selectedPeriod = {
    startDate: moment().clone().subtract(14, "days").format("YYYY-MM-DD"),
    endDate: moment().endOf("day").format("YYYY-MM-DD"),
  },
}: SalesInPeriod) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `https://cors-anywhere.herokuapp.com/http://localhost:3003/api/views?eventId=${eventId}&startDate=${selectedPeriod.startDate}&endDate=${selectedPeriod.endDate}`,
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors", // disable cors
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

