import { getCookie } from "../lib/utils"
import axiosInstance from "./axios-interceptor"

interface EventTicketEmails {
    eventId: string | undefined
    page?: number
    size?: number
}

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const getEventTicketEmails = async ({
    eventId,
    page = 0,
    size = 10,
  }: EventTicketEmails) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/v1/email/event?eventId=${eventId}&page=${page}&size=${size}`,
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
  

