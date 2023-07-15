/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import MainContainer from "../../components/ui/CustomContainer"
import CustomButton from "../../components/ui/CustomButton"
import CalendarImage from "../../assets/images/calendar.png"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { Switch } from "../../components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import { ExternalLink } from "lucide-react"
import testImage from "../../assets/images/Chapo.jpg"
import { fetchUserEventsFn } from "@/src/apiCalls"
import { errorToast } from "@/src/lib/utils"
import { EventDataType } from "@/src/types"
import moment from "moment"

const Events = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userEvents, setUserEvents] = useState<[]>([])
  const [eventsError, setEventsError] = useState<string>("")

  useEffect(() => {
    fetchEvents() //TODO: Pass the proper eventId
  }, [])

  const fetchEvents = async () => {
    setIsLoading(true)
    try {
      const res = await fetchUserEventsFn()
      if (res.status === 200) {
        setUserEvents(res.data)
      } else {
        setEventsError(res.message)
        errorToast("Could not fetch your. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch your. Try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainContainer>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Manage your events | Tikomatata</title>
        <link rel="canonical" href="https://tikomatata.com/events" />
      </Helmet>
      <div className="text-neutralDark ml-[30px] min-[980px]:ml-0">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="text-[23px] font-semibold">My Events</h2>
          <Link to={"/create-event"}>
            <CustomButton className="mt-[1em]">Create Event</CustomButton>
          </Link>
        </div>
        {userEvents.length > 0 ? (
          <div className="mt-[20px] h-[90vh]">
            {userEvents?.map((event: EventDataType) => {
              return (
                <div className="flex flex-col w-full space-y-4 mb-4" key={event?.name}>
                  <div className="h-full w-full flex flex-row items-center justify-between rounded bg-gray-100">
                    <Link
                      to={`/events/manage/${event?.eventId}`}
                      className="w-full h-full px-4 py-2 flex flex-row items-center"
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
                    </Link>
                    <div className="pr-4 flex flex-row items-center justify-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <p>
                              <Switch />
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
      </div>
    </MainContainer>
  )
}

export default Events
