import { Badge } from "@tremor/react"
import React from "react"
import { Pencil } from "lucide-react"

interface EventTicketProps {
  title: string
  date: string
  location: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EventTicketCard: React.FC<EventTicketProps> = ({ title, date, location }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-center bg-cover w-[46%] m-2">
        <div className="w-full mx-auto z-10 bg-blue-900 rounded-3xl">
          <div className="flex flex-col">
            <div className="bg-white relative drop-shadow-2xl rounded-3xl p-4 m-2">
              <div className="flex-none sm:flex">
                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center my-1">
                      <h2 className="font-medium">Early Bird Tickets</h2>
                    </div>
                    <div className="ml-auto">
                      <Pencil
                        size={18}
                        className="cursor-pointer"
                        onClick={() => alert("clicked")}
                      ></Pencil>
                    </div>
                  </div>

                  <div className="border-b border-dashed border-b-2 my-3 pt-3">
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                  </div>
                  <div className="flex flex-col py-3 items-center justify-center text-sm ">
                    <h6 className="font-bold text-center">Tickets Sold</h6>
                    <div className="flex row items-center">
                      <p className="font-bold text-center text-2xl mt-2 text-gray-500">200/500</p>
                      <Badge color="green" size="xs" className="ml-2 h-7">
                        12.3% Sold
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col py-3 justify-center text-sm ">
                    <h6 className="font-bold text-center">Sale Period</h6>
                    <p className="font-bold text-center text-lg mt-2 text-gray-500">
                      03 June - 08 August
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
