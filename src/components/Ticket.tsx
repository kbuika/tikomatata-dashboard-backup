import { Badge } from "@tremor/react"
import React from "react"
import { Pencil } from "lucide-react"
import { Sheet, SheetTrigger, SheetHeader, SheetContent, SheetDescription } from "./ui/sheet"
import Input from "./ui/Input"
import { DatePicker } from "./ui/datePicker"
import CustomButton from "./ui/CustomButton"
import { TicketDataType } from "../types"
import moment from "moment"
import { TimePicker } from "./ui/timePicker"

interface EventTicketProps {
  ticketData: TicketDataType
  key: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EventTicketCard: React.FC<EventTicketProps> = (ticketData) => {
  const ticket = ticketData?.ticketData
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
                      <Sheet>
                        <SheetTrigger>
                          <Pencil size={18} className="cursor-pointer" />
                        </SheetTrigger>
                        <SheetContent className="w-[50%]">
                          <SheetHeader>Edit Ticket Details</SheetHeader>
                          <SheetDescription>
                            <div className="h-auto w-full mt-6 mb-6">
                              <div className="flex flex-row items-center justify-between w-full">
                                <div className="w-full">
                                  <label htmlFor="name" className="text-neutralDark">
                                    Ticket Name
                                  </label>
                                  <Input
                                    id="name"
                                    name="ticketName"
                                    placeholder="Ticket Name"
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-row items-center justify-between w-full mt-6">
                                <div className="w-[48%]">
                                  <label htmlFor="quantity" className="text-neutralDark">
                                    Ticket Quanity
                                  </label>
                                  <Input
                                    id="name"
                                    name="ticketQuantity"
                                    placeholder="Ticket Quantity"
                                    type="text"
                                  />
                                </div>
                                <div className="w-[48%]">
                                  <label htmlFor="price" className="text-neutralDark">
                                    Ticket Price
                                  </label>
                                  <Input
                                    id="price"
                                    name="ticketPrice"
                                    placeholder="Ticket Price"
                                    type="number"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-row items-center justify-between w-full mt-6">
                                <div className="flex flex-col w-[48%]">
                                  <label htmlFor="name" className="text-neutralDark">
                                    Sale Start Date
                                  </label>
                                  <DatePicker className="w-full" />
                                </div>
                                <div className="flex flex-col w-[48%]">
                                  <label htmlFor="name" className="text-neutralDark">
                                    Sale End Date
                                  </label>
                                  <DatePicker className="w-full" />
                                </div>
                              </div>
                              <div className="flex flex-row items-center justify-between w-[50%] mt-6">
                                <div className="flex flex-col w-auto">
                                  <label htmlFor="name" className="text-neutralDark">
                                    Sale Start Time
                                  </label>
                                  <TimePicker time="12:00" setTime={(time) => console.log(time)} />
                                </div>
                                <div className="flex flex-col w-auto ml-8">
                                  <label htmlFor="name" className="text-neutralDark">
                                    Sale End Time
                                  </label>
                                  <TimePicker time="12:00" setTime={(time) => console.log(time)} />
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <CustomButton
                                  className="mt-6 w-1/3"
                                  type="submit"
                                  color="primary"
                                  size="lg"
                                >
                                  Save Changes
                                </CustomButton>
                              </div>
                            </div>
                          </SheetDescription>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>

                  <div className="border-b border-dashed border-b-2 my-3 pt-3">
                    <div className="absolute rounded-full w-5 h-5 bg-neutralDark -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-neutralDark -mt-2 -right-2"></div>
                  </div>
                  <div className="flex flex-col py-3 items-center justify-center text-sm ">
                    <h6 className="font-bold text-center">Tickets Sold</h6>
                    <div className="flex row items-center">
                      <p className="font-bold text-center text-2xl mt-2 text-gray-500">200/500</p>
                      <Badge color="green" size="xs" className="ml-2 h-7 max-[480px]:hidden">
                        12.3% Sold
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col py-3 justify-center text-sm ">
                    <h6 className="font-bold text-center">Sale Period</h6>
                    <p className="font-bold text-center text-lg mt-2 text-gray-500">
                      {moment(ticket?.saleStartDate).format("Do MMMM")} -{" "}
                      {moment(ticket?.saleEndDate)?.format("Do MMMM")}
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
