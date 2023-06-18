import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

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
