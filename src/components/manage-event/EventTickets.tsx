/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import CustomButton from "../ui/CustomButton"
import CreateTicket from "./CreateTicket"
import EventTicketCard from "../Ticket"
import VerticalEventNavBar from "@/src/layouts/VerticalEventNavBar"
import { fetchEventTicketsFn } from "@/src/apiCalls"
import { TicketDataType } from "@/src/types"
import { errorToast } from "@/src/lib/utils"
import { useParams } from "react-router-dom"

const EventTickets = () => {
  const [createTicketView, setCreateTicketView] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [eventTickets, setEventTickets] = useState<[]>([])
  const [fetchTicketsError, setTicketsError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const params = useParams()

  useEffect(() => {
    fetchTickets(params.id)
  }, [])

  const fetchTickets = async (eventId: string | undefined) => {
    setIsLoading(true)
    try {
      const res = await fetchEventTicketsFn(eventId)
      if (res.status === 200) {
        setEventTickets(res.data)
      } else {
        setTicketsError(res.message)
        errorToast("Could not fetch this event's tickets. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch this event's tickets. Try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="text-neutralDark mt-2">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="text-[18px] font-semibold">event Tickets</h2>
          <div>
            {createTicketView ? (
              <>
                <CustomButton
                  className="mr-2 bg-neutralWhite text-mainSecondary"
                  onClick={() => setCreateTicketView(false)}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    // handleSubmit(submit)
                    // setCreateTicketView(false)
                  }}
                >
                  Save
                </CustomButton>
              </>
            ) : (
              <CustomButton className="" onClick={() => setCreateTicketView(true)}>
                Create Ticket
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      <VerticalEventNavBar />
      <div className="border h-auto rounded-md mt-[3em] p-4">
        {createTicketView ? (
          <CreateTicket setCreateTicketView={setCreateTicketView} />
        ) : (
          <>
            {eventTickets?.length > 0 ? (
              <div className="flex flex-row flex-wrap items-start justify-between h-auto mt-[2em] mb-12 max-[680px]:items-center max-[680px]:justify-center">
                {eventTickets?.map((ticket: TicketDataType) => (
                  <EventTicketCard ticketData={ticket} key={ticket?.name} />
                ))}
              </div>
            ) : (
              <div className="h-auto w-auto flex flex-col items-start mt-[3em]">
                <div className="flex flex-col items-start">
                  <h2 className="text-[1.2em] font-semibold">
                    Oops! You have not created any tickets for this event
                  </h2>
                  <p className="mt-[1em] text-[#6D7175] text-[1.1em]">
                    Create event tickets to start selling
                  </p>
                  <CustomButton className="mt-4" onClick={() => setCreateTicketView(true)}>
                    Create Ticket
                  </CustomButton>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default EventTickets
