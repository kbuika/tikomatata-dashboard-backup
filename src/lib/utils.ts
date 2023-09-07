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
  return { hasError, message: errorMessage?.message }
}

export const errorToast = (message: string | unknown) => {
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

export const getUserNameInitials = (fullName: string) => {
  // Split the full name into an array of individual words
  const words = fullName.trim().split(/\s+/)

  // Get the first letter of each word and capitalize it
  const initials = words.map((word) => word.charAt(0).toUpperCase())

  // Join the initials together to form the result
  return initials.join("")
}

export const generateFileFromImageUrl = async(imageUrl: string, filename: string): Promise<File | null> => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://cors-anywhere.herokuapp.com/${imageUrl}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  }
  try {
    const response = await fetch(imageUrl, config);
    const blob = await response.blob();
    const file = new File([blob], filename, { type: blob.type });
    return file;
  } catch (error) {
    console.error("Error creating File:", error);
    return null;
  }
}

