export interface UserRegisterObj {
  email: string
  phone: string
  fullName: string
  password: string
}

export interface UserLoginObj {
  email: string
  password: string
}

export interface EventDataType {
  name: string
  description: string
  location?: string
  mapLink?: string
  environment?: string
  startDate: Date
  endDate: Date
  startTime: string
  endTime: string
  ageLimit?: number
  poster: File
}
