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
  startDate: string | Date
  endDate: string | Date
  startTime?: string
  endTime?: string
  ageLimit: number | string
  poster: FileList
  posterUrl?: string
  cancelled?: boolean
  tickets?: TicketDataType[]
  published?: boolean
  slug?: string
}

export interface EventRequestType {
  mapLink?: Maybe<string | undefined>
  name: string
  description: string
  ageLimit: number | null
  slug: string
  poster: AnyPresentValue
  location: string
  environment: string | null
  startDate: string
  endDate: string
  startTime: string
  endTime: string
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

export interface TicketDataRequestType {
  name: string
  price: string
  quantity: string
  saleStartDate: string
  saleEndDate: string
  saleStartTime: string
  saleEndTime: string
  eventId?: string | number
  ticketId?: string | number | undefined
}

export interface CompTicketType {
  name: string
  email: string
  phone: string
  ticketType: string
  quantity: number
  eventId?: number | string
  ticketId: string
}

export interface CompTicketRequestType {
  name: string
  email: string
  phone: string
  ticketId: string
  quantity: number
}
