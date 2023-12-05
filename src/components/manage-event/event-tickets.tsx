/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchEventTicketsFn } from "@/src/api-calls"
import EventPagesWrapper from "@/src/layouts/wrappers/event-pages-wrapper"
import { errorToast } from "@/src/lib/utils"
import { useEventsStore } from "@/src/stores/events-store"
import { useTicketsStore } from "@/src/stores/tickets-store"
import { TicketDataType } from "@/src/types"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoadingScreen from "../loading-screen"
import SendComplimentaryTicket from "../send-complimentary-ticket"
import EventTicketCard from "../ticket-card"
import CustomButton from "../ui/custom-button"
import CreateTicket from "./create-ticket"

const EventTickets = () => {
  const allTickets = useTicketsStore((state) => state.allTickets)
  const setAllTickets = useTicketsStore((state) => state.setAllTickets)
  const [createTicketView, setCreateTicketView] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [eventTickets, setEventTickets] = useState<Array<TicketDataType>>(allTickets)
  const [fetchTicketsError, setTicketsError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const params = useParams()

  useEffect(() => {
    // if(allTickets.length > 0) {
    //   setEventTickets(allTickets)
    // }else {
    fetchTickets(params.id)
    // }
  }, [])

  const fetchTickets = async (eventId: string | undefined) => {
    setIsLoading(true)
    try {
      const res = await fetchEventTicketsFn(eventId)
      if (res.status === 200) {
        setEventTickets(res.data)
        setAllTickets(res.data)
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
    <EventPagesWrapper
      right={
        <div className="text-neutralDark">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="mr-4">
              <SendComplimentaryTicket />
            </div>
            <div>
              {createTicketView ? (
                <></>
              ) : (
                <CustomButton className="" onClick={() => setCreateTicketView(true)}>
                  <Plus size={20} className="mr-2" /> Create Ticket
                </CustomButton>
              )}
            </div>
          </div>
        </div>
      }
    >
      {isLoading ? (
        <div className="border h-auto rounded-md p-4">
          <LoadingScreen message="Fetching tickets ..." />
        </div>
      ) : (
        <div className="border h-auto rounded-md p-4">
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
                <div className="h-auto w-auto flex flex-col items-start my-4 p-2">
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
      )}
    </EventPagesWrapper>
  )
}

export default EventTickets
