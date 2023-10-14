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

export interface ResetPasswordArgs {
  email: string | null
  password: string
  code: number
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
  ageLimit: number | string
  poster: FileList
  posterUrl?: string
  cancelled?: boolean
  tickets?: TicketDataType[]
}

export interface EventDataTypeExtended extends EventDataType {
  poster: FileList | null
}

export type UpdateEventDataType = EventDataType & {
  posterUrl: string
}

export interface TicketDataType {
  eventId: number
  ticketId?: number
  name: string
  price: string
  quantity: string
  saleStartDate: string
  saleEndDate: string
  saleStartTime: string
  saleEndTime: string
}
