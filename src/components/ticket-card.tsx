import React, { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, SubmitHandler } from "react-hook-form"
// import { Badge } from "@tremor/react"
import { Loader2 } from "lucide-react"
import { Sheet, SheetTrigger, SheetHeader, SheetContent } from "./ui/sheet"
import Input from "./ui/Input"
import { DatePicker } from "./ui/date-picker"
import CustomButton from "./ui/custom-button"
import { TicketDataRequestType, TicketDataType } from "../types"
import moment from "moment"
import { TimePicker } from "./ui/time-picker"
import { checkRegistrationError, errorToast, successToast } from "../lib/utils"
import { updateTicketFn } from "../api-calls"
import { Button } from "./ui/button"
import { useTicketsStore } from "../stores/tickets-store"

const schema = yup.object({
  name: yup.string().required("Ticket name is required"),
  price: yup.string().required("Price is required"),
  quantity: yup.string().required("quantity is required"),
  saleStartDate: yup.string().required("Start date is required"),
  saleEndDate: yup.string().required("End date is required"),
  saleStartTime: yup.string().default("12:00").required("Start time is required"),
  saleEndTime: yup.string().default("12:00").required("End time is required"),
})

interface EventTicketProps {
  ticketData: TicketDataType
  key: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EventTicketCard: React.FC<EventTicketProps> = (ticketData) => {
  const [isLoading, setIsLoading] = useState(false)
  const [updateTicketError, setUpdateTicketError] = useState<any>([])
  const [editSheetOpen, setEditSheetOpen] = useState<boolean>(false)
  const ticket = ticketData?.ticketData

  // store
  const resetAllTickets = useTicketsStore((state) => state.resetAllTickets)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TicketDataRequestType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...ticket,
      eventId: ticket?.eventId,
    },
  })

  const submit: SubmitHandler<TicketDataRequestType> = async (data) => {
    setIsLoading(true)
    try {
      data = { ...data, eventId: ticket?.eventId, ticketId: ticket?.ticketId }
      const res = await updateTicketFn(data)
      if (res?.data?.status === 200) {
        resetAllTickets() // reset tickets in store to trigger a re-fetch
        successToast("Ticket has been updated successfully!")
        setEditSheetOpen(false)
        window.location.reload() // reload page to reflect changes
      } else {
        errorToast(res?.data?.message)
        if (res?.response?.data?.data?.errors) {
          setUpdateTicketError(res?.response?.data?.data?.errors)
        }
      }
    } catch (err) {
      setUpdateTicketError(err)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-center bg-cover w-[46%] m-2 max-[580px]:w-[80%]">
        <div className="w-full mx-auto z-10 bg-neutralDark rounded-3xl">
          <div className="flex flex-col">
            <div className="bg-white relative drop-shadow-2xl rounded-3xl p-4 m-2">
              <div className="flex-none sm:flex">
                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center my-1">
                      <h2 className="font-medium">{ticket?.name}</h2>
                    </div>
                    <div className="ml-auto">
                      <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
                        <SheetTrigger onClick={() => setEditSheetOpen(true)}>
                          <p className="underline underline-offset-4">edit</p>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px]">
                          <SheetHeader className="font-bold text-lg text-center">
                            Edit Ticket Details
                          </SheetHeader>
                          {isLoading ? (
                            <div className="flex items-center justify-center min-h-[40vh]">
                              <Loader2 className="w-10 h-10 animate-spin" />
                            </div>
                          ) : (
                            <div className="h-auto w-full mt-6 mb-6">
                              <div className="flex flex-row items-center justify-between w-full">
                                <div className="w-full">
                                  <label htmlFor="name" className="text-neutralDark">
                                    Ticket Name
                                  </label>
                                  <Input
                                    id="name"
                                    placeholder="Ticket Name"
                                    type="text"
                                    defaultValue={ticket?.name}
                                    {...register("name", { required: true })}
                                  />
                                  {errors.name && (
                                    <span className="text-criticalRed">{errors.name?.message}</span>
                                  )}
                                  {checkRegistrationError("name", updateTicketError)?.hasError && (
                                    <span className="text-criticalRed">
                                      {checkRegistrationError("name", updateTicketError)?.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-row items-center justify-between w-full mt-4">
                                <div className="w-[48%]">
                                  <label htmlFor="quantity" className="text-neutralDark">
                                    Ticket Quanity
                                  </label>
                                  <Input
                                    id="quantity"
                                    placeholder="Ticket Quantity"
                                    type="text"
                                    defaultValue={ticket?.quantity}
                                    {...register("quantity", { required: true })}
                                  />
                                  {errors.quantity && (
                                    <span className="text-criticalRed">
                                      {errors.quantity?.message}
                                    </span>
                                  )}
                                  {checkRegistrationError("quantity", updateTicketError)
                                    ?.hasError && (
                                    <span className="text-criticalRed">
                                      {
                                        checkRegistrationError("quantity", updateTicketError)
                                          ?.message
                                      }
                                    </span>
                                  )}
                                </div>
                                <div className="w-[48%]">
                                  <label htmlFor="price" className="text-neutralDark">
                                    Ticket Price
                                  </label>
                                  <Input
                                    id="price"
                                    placeholder="Ticket Price"
                                    type="number"
                                    defaultValue={ticket?.price}
                                    {...register("price", { required: true })}
                                  />
                                  {errors.price && (
                                    <span className="text-criticalRed">
                                      {errors.price?.message}
                                    </span>
                                  )}
                                  {checkRegistrationError("price", updateTicketError)?.hasError && (
                                    <span className="text-criticalRed">
                                      {checkRegistrationError("price", updateTicketError)?.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col w-full mt-4">
                                <label htmlFor="name" className="text-neutralDark">
                                  Sale Start Date
                                </label>
                                <DatePicker
                                  onChange={(date: Date | undefined) => {
                                    const startDate = moment(date).format("YYYY-MM-DD")
                                    setValue("saleStartDate", startDate)
                                    setUpdateTicketError([])
                                  }}
                                  defaultDate={ticket?.saleStartDate}
                                  className="w-full mt-1"
                                  popoverZIndex={350}
                                />
                                {errors.saleStartDate && (
                                  <span className="text-criticalRed">
                                    {errors.saleEndDate?.message}
                                  </span>
                                )}
                                {checkRegistrationError("saleStartDate", updateTicketError)
                                  ?.hasError && (
                                  <span className="text-criticalRed">
                                    {
                                      checkRegistrationError("saleStartDate", updateTicketError)
                                        ?.message
                                    }
                                  </span>
                                )}
                                {checkRegistrationError(
                                  "saleStartDate, saleEndDate",
                                  updateTicketError,
                                )?.hasError && (
                                  <span className="text-criticalRed">
                                    {
                                      checkRegistrationError(
                                        "saleStartDate, saleEndDate",
                                        updateTicketError,
                                      )?.message
                                    }
                                  </span>
                                )}{" "}
                              </div>
                              <div className="flex flex-col w-full mt-4">
                                <label htmlFor="name" className="text-neutralDark">
                                  Sale End Date
                                </label>
                                <DatePicker
                                  onChange={(date: Date | undefined) => {
                                    const endDate = moment(date).format("YYYY-MM-DD")
                                    setValue("saleEndDate", endDate)
                                    setUpdateTicketError([])
                                  }}
                                  defaultDate={ticket?.saleEndDate}
                                  className="w-full mt-1"
                                  popoverZIndex={350}
                                />
                                {errors.saleEndDate && (
                                  <span className="text-criticalRed">
                                    {errors.saleEndDate?.message}
                                  </span>
                                )}
                                {checkRegistrationError("saleEndDate", updateTicketError)
                                  ?.hasError && (
                                  <span className="text-criticalRed">
                                    {
                                      checkRegistrationError("saleEndDate", updateTicketError)
                                        ?.message
                                    }
                                  </span>
                                )}{" "}
                              </div>
                              <div className="flex flex-row items-center justify-between w-full mt-4">
                                <div className="flex flex-col">
                                  <label htmlFor="name" className="text-neutralDark">
                                    Sale Start Time
                                  </label>
                                  <TimePicker
                                    time={ticket?.saleStartTime}
                                    setTime={(time) => setValue("saleStartTime", time)}
                                    buttonStyle={"w-[160px]"}
                                  />
                                  {errors.saleStartTime && (
                                    <span className="text-criticalRed">
                                      {errors.saleStartTime?.message}
                                    </span>
                                  )}
                                  {checkRegistrationError("saleStartTime", updateTicketError)
                                    ?.hasError && (
                                    <span className="text-criticalRed">
                                      {
                                        checkRegistrationError("saleStartTime", updateTicketError)
                                          ?.message
                                      }
                                    </span>
                                  )}{" "}
                                </div>
                                <div className="flex flex-col ml-2">
                                  <label htmlFor="name" className="text-neutralDark">
                                    Sale End Time
                                  </label>
                                  <TimePicker
                                    time="12:00"
                                    setTime={(time) => setValue("saleEndTime", time)}
                                    buttonStyle={"w-[160px]"}
                                  />
                                  {errors.saleEndTime && (
                                    <span className="text-criticalRed">
                                      {errors.saleEndTime?.message}
                                    </span>
                                  )}
                                  {checkRegistrationError("saleEndTime", updateTicketError)
                                    ?.hasError && (
                                    <span className="text-criticalRed">
                                      {
                                        checkRegistrationError("saleEndTime", updateTicketError)
                                          ?.message
                                      }
                                    </span>
                                  )}{" "}
                                </div>
                              </div>
                              <div className="flex items-center justify-end mt-6">
                                <Button variant="ghost" onClick={() => setEditSheetOpen(false)}>
                                  Cancel
                                </Button>
                                <CustomButton
                                  className="w-auto ml-4"
                                  type="submit"
                                  color="primary"
                                  size="lg"
                                  onClick={handleSubmit(submit)}
                                >
                                  Save Changes
                                </CustomButton>
                              </div>
                            </div>
                          )}
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>

                  <div className="border-dashed border-b-2 my-3 pt-3">
                    <div className="absolute rounded-full w-5 h-5 bg-neutralDark -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-neutralDark -mt-2 -right-2"></div>
                  </div>
                  {/* TODO: Restore ticket sale count when ready */}
                  {/* <div className="flex flex-col py-3 items-center justify-center text-sm ">
                    <h6 className="font-bold text-center">Tickets Sold</h6>
                    <div className="flex row items-center">
                      <p className="font-bold text-center text-2xl mt-2 text-gray-500">200/500</p>
                      <Badge color="green" size="xs" className="ml-2 h-7 max-[480px]:hidden">
                        12.3% Sold
                      </Badge>
                    </div>
                  </div> */}
                  <div className="flex flex-col py-3 justify-center text-sm ">
                    <h6 className="font-bold text-center">Ticket Price</h6>
                    <p className="font-bold text-center text-lg mt-1 text-gray-500">
                      KES {ticket?.price}
                    </p>
                  </div>
                  <div className="flex flex-col py-3 justify-center text-sm ">
                    <h6 className="font-bold text-center">Sale Period</h6>
                    <p className="font-bold text-center text-lg mt-2 text-gray-500">
                      {moment(ticket?.saleStartDate).format("Do MMM")} -{" "}
                      {moment(ticket?.saleEndDate)?.format("Do MMM")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventTicketCard
