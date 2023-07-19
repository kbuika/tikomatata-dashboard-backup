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
  eventId?: number
  name: string
  description: string
  location?: string
  mapLink?: string
  environment?: string
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  ageLimit: number
  poster: FileList
  posterUrl?: string
}

export interface TicketDataType {
  eventId: number
  name: string
  price: string
  quantity: string
  saleStartDate: string
  saleEndDate: string
  saleStartTime?: string
  saleEndTime?: string
}
