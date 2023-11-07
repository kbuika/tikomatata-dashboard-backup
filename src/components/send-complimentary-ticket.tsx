import React, { useState } from "react"
import CustomButton from "./ui/custom-button"
import { Button } from "./ui/button"
import { Sheet, SheetTrigger, SheetHeader, SheetContent } from "./ui/sheet"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "./ui/select"
import { useTicketsStore } from "../stores/tickets-store"
import Input from "./ui/Input"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEventsStore } from "../stores/events-store"
import { errorToast, formatPhoneNumber, successToast } from "../lib/utils"
import { CompTicketType } from "../types"
import { sendCompTicket } from "../api-calls"

const schema = yup.object({
  name: yup.string().required("name name is required"),
  email: yup.string().required("email is required"),
  phone: yup.string().required("phone is required"),
  ticketType: yup.string().required("ticketType is required"),
  quantity: yup.number().required("quantity is required"),
})

const SendComplimentaryTicket = () => {
  const [compSheetOpen, setCompSheetOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const allTickets = useTicketsStore((state) => state.allTickets)
  const selectedEvent = useEventsStore((state) => state.selectedEvent)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompTicketType>({ resolver: yupResolver(schema) })

  const submit: SubmitHandler<CompTicketType> = async (data) => {
    setIsLoading(true)
    try {
      const compTicketData = {
        ...data,
        eventId: selectedEvent?.eventId,
        phoneNumber: formatPhoneNumber(data?.phone),
      }
      const res = await sendCompTicket(compTicketData)
      if (res?.status) {
        successToast(
          `${data?.name} has been sent ${data?.quantity} Complimentary ticket${
            data.quantity > 1 ? "s " : " "
          }!!`,
        )
      } else {
        errorToast(
          `Failed to send complimentary ticket${data?.quantity > 1 ? "s " : " "} to ${data?.name}`,
        )
      }
    } catch (error) {
      errorToast(
        `Failed to send complimentary ticket${data?.quantity > 1 ? "s " : " "} to ${data?.name}`,
      )
    }finally {
        setIsLoading(false)
    }
  }
  return (
    <div className="ml-auto">
      <Sheet open={compSheetOpen} onOpenChange={setCompSheetOpen}>
        <SheetTrigger>
          <CustomButton onClick={() => setCompSheetOpen(true)} variant={"secondary"} className="bg-gray-200 text-mainPrimary dark:bg-gray-200 dark:text-mainPrimary">
            Send Complimentary Ticket
          </CustomButton>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader className="font-bold text-lg text-center">
            Send Complimentary Ticket
          </SheetHeader>
          <div className="mt-4">
            <div className="w-full mt-4">
              <label htmlFor="name" className="text-neutralDark">
                Name
              </label>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                {...register("name", { required: true })}
                className="mt-1"
              />
              {errors.name && <div className="text-criticalRed">{errors?.name?.message}</div>}
              {/*{checkRegistrationError("price", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("price", createTicketError)?.message}
            </span>
          )} */}
            </div>
            <div className="w-full mt-4">
              <label htmlFor="email" className="text-neutralDark">
                Email
              </label>
              <Input
                id="email"
                placeholder="Email"
                type="text"
                {...register("email", { required: true })}
                className="mt-1"
              />
              {errors?.email && <span className="text-criticalRed">{errors.email?.message}</span>}
              {/* {checkRegistrationError("price", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("price", createTicketError)?.message}
            </span>
          )} */}
            </div>
            <div className="w-full mt-4">
              <label htmlFor="phone" className="text-neutralDark">
                Phone
              </label>
              <Input
                id="phone"
                placeholder="Phone"
                type="text"
                {...register("phone", { required: true })}
                className="mt-1"
              />
              {errors.phone && <span className="text-criticalRed">{errors.phone?.message}</span>}
              {/*{checkRegistrationError("price", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("price", createTicketError)?.message}
            </span>
          )} */}
            </div>
            <div className="w-full mt-4">
              <label htmlFor="name" className="text-neutralDark">
                Ticket Type
              </label>
              <Select onValueChange={(value) => setValue("ticketType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ticket Type" />
                </SelectTrigger>
                <SelectContent className="z-[350]">
                  <SelectGroup>
                    <SelectLabel>Ticket Type</SelectLabel>
                    {allTickets.map((ticket) => {
                      return (
                        <SelectItem value={ticket.name} key={ticket?.name}>
                          {ticket.name}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.ticketType && (
                <span className="text-criticalRed">{errors.ticketType?.message}</span>
              )}
            </div>
            <div className="w-full mt-4">
              <label htmlFor="quantity" className="text-neutralDark">
                Number of Tickets
              </label>
              <Input
                id="quantity"
                placeholder="Number of Tickets"
                type="number"
                {...register("quantity", { required: true })}
                className="mt-1"
              />
              {errors.quantity && (
                <span className="text-criticalRed">{errors.quantity?.message}</span>
              )}
              {/*{checkRegistrationError("price", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("price", createTicketError)?.message}
            </span>
          )} */}
            </div>
            <div className="flex items-center justify-end mt-6">
              <Button variant="ghost" onClick={() => setCompSheetOpen(false)}>
                Cancel
              </Button>
              <CustomButton
                className="w-auto ml-4"
                type="submit"
                color="primary"
                size="lg"
                onClick={handleSubmit(submit)}
                disabled={isLoading}
                isLoading={isLoading}
              >
                {isLoading ? "Sending...": "Send"}
              </CustomButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SendComplimentaryTicket
