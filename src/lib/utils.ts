import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { ACCESS_TOKEN } from "../constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPhoneNumber = (phone: string) => {
  if (phone.split("").length > 13 || phone.split("").length < 9) {
    throw new Error("Invalid Phone Number")
  }
  // get the last 9 digits
  return `254${phone.slice(-9)}`
}

export const checkRegistrationError = (field: string, errors: any) => {
  const hasError = errors?.some((error: { code: string; message: string }) => error?.code === field)
  const errorMessage = errors?.find(
    (error: { code: string; message: string }) => error?.code === field,
  )

  return { hasError, message: errorMessage }
}

export const errorToast = (message: string) => {
  toast.error(`Error: ${message}`, {
    autoClose: 4000,
    pauseOnHover: true,
    position: toast.POSITION.TOP_RIGHT,
  })
}

export const successToast = (message: string) => {
  toast.success(`Yoohoo: ${message}`, {
    autoClose: 4000,
    pauseOnHover: true,
    position: toast.POSITION.TOP_RIGHT,
  })
}

export const setCookie = (cookieName: string, value: string) => {
  if (cookieName === ACCESS_TOKEN) {
    Cookies.set(cookieName, value, { expires: 1 })
  }
  Cookies.set(cookieName, value)
}

export const getCookie = (cookieName: string): string | undefined => {
  const cookie = Cookies.get(cookieName)
  return cookie
}

export const removeCookie = (cookieName: string) => {
  Cookies.remove(cookieName)
}
