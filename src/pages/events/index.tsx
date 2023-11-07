/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import MainAppWrapper from "@/src/layouts/wrappers/main-app-wrapper"
import MainContainer from "../../components/ui/custom-container"
import CustomButton from "../../components/ui/custom-button"
import CalendarImage from "../../assets/images/calendar.png"
import { Link, useNavigate } from "react-router-dom"
import { Switch } from "../../components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import { ExternalLink, Loader2, Plus } from "lucide-react"
import testImage from "../../assets/images/Chapo.jpg"
import { fetchUserEventsFn } from "@/src/api-calls"
import { errorToast } from "@/src/lib/utils"
import { EventDataType } from "@/src/types"
import moment from "moment"
import LoadingScreen from "@/src/components/loading-screen"
import { useEventsStore } from "@/src/stores/events-store"
import { useTicketsStore } from "@/src/stores/tickets-store"

const Events = () => {
  const allEvents = useEventsStore((state) => state.allEvents)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userEvents, setUserEvents] = useState<Array<EventDataType>>(allEvents)
  const [eventsError, setEventsError] = useState<string>("")
  const navigate = useNavigate()
  // stores
  const setAllEvents = useEventsStore((state) => state.setAllEvents)
  const setSelectedEvent = useEventsStore((state) => state.setSelectedEvent)
  const resetAllTickets = useTicketsStore((state) => state.resetAllTickets)
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const res = await fetchUserEventsFn()
        if (res.status === 200) {
          setUserEvents(res.data)
          setAllEvents(res.data)
        } else {
          setEventsError(res.message)
          errorToast("Could not fetch your events. Try again later.")
        }
      } catch (error) {
        errorToast("Could not fetch your events. Try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    if(allEvents.length > 0) {
      setUserEvents(allEvents)
    }else {
      fetchEvents()
    }

    return () => {}
  }, [])
  

  const goToEvent = (eventId: number | undefined, event: EventDataType) => {
    // set active event and navigate to event page
    setSelectedEvent(event)
    resetAllTickets() // reset all tickets in cache
    navigate(`/events/manage/${eventId}`)
  }

  return (
    <MainAppWrapper
      left={
        <div>
          <h2 className="text-[17px] md:text-[16px] font-semibold">My Events</h2>
        </div>
      }
      right={
        <div className="flex flex-row items-center">
          <Link to={"/create-event"}>
            <CustomButton>
              <Plus size={20} className="mr-2" /> Create Event
            </CustomButton>
          </Link>
        </div>
      }
    >
      <div className="text-neutralDark px-[20px] pt-[4em] pb-[30px] min-[768px]:ml-0 ">
        {userEvents.length > 0 ? (
          <div className="mt-[10px] min-h-[90vh] h-auto mb-[20px]">
            {userEvents?.map((event: EventDataType) => {
              return (
                <div className="flex flex-col w-full space-y-4 mb-4" key={event?.name}>
                  <div className="h-full w-full flex flex-row items-center justify-between rounded bg-gray-100">
                    <div
                      className="w-full h-full px-4 py-2 flex flex-row items-center cursor-pointer"
                      onClick={() => goToEvent(event?.eventId, event)}
                    >
                      <div className="h-10 w-10 bg-neutralDark rounded">
                        <img
                          src={event?.posterUrl}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-4">
                        <p>
                          {event?.name} on {moment(event?.startDate)?.format("Do MMMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="pr-4 flex flex-row items-center justify-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <p>
                              <Switch disabled={true}/>
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Publish event</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <Link to={`/events/manage/${event?.eventId}`}>
                              <p className="ml-4 mb-2">
                                <ExternalLink />
                              </p>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Manage event</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <div className="mt-[20px] h-[90vh]">
                <div className="h-auto w-auto flex flex-col items-center">
                  <div>
                    <img src={CalendarImage} alt="calendar" className="h-[25em] w-[35em]" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h2 className="text-[25px] font-semibold">Oops! No event yet</h2>
                    <p className="mt-[1em] text-[#6D7175] text-[1.1em]">
                      Lets get you started by creating an event
                    </p>
                    <Link to={"/create-event"}>
                      <CustomButton className="mt-[1em]">Create Event</CustomButton>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MainAppWrapper>
  )
}

export default Events
