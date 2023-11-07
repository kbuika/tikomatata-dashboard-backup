import { publishEventFn } from "@/src/api-calls"
import { getTotalSales } from "@/src/api-calls/dashboard"
import EventPagesWrapper from "@/src/layouts/wrappers/event-pages-wrapper"
import { errorToast, successToast } from "@/src/lib/utils"
import { useEventsStore } from "@/src/stores/events-store"
import { DialogClose } from "@radix-ui/react-dialog"
import {
  Card,
  Flex,
  Grid,
  Metric,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text
} from "@tremor/react"
import { Loader2, Rocket } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CalendarImage from "../../assets/images/calendar.png"
import AttendeesTab from "../dashboard/tabs/attendees"
import TransactionsTab from "../dashboard/tabs/transactions"
import CustomButton from "../ui/custom-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import TicketsSoldBarChart from "../dashboard/charts/tickets-sold-barchart"


const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat("us", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString()

const EventDashBoard = () => {
  const [publishEventLoading, setPublishEventLoading] = useState(false)
  const [totalSales, setTotalSales] = useState(0)
  const [isLoadingSales, setIsLoadingSales] = useState(false)
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const params = useParams()

  useEffect(() => {
    // if(allTickets.length > 0) {
    //   setEventTickets(allTickets)
    // }else {
      fetchAllSales(params.id)
    // }
  }, [])

  const fetchAllSales = async (eventId: string | undefined) => {
    setIsLoadingSales(true)
    try {
      const res = await getTotalSales(eventId)
      if (res.status === 200) {
        setTotalSales(res.data.totalAmount)
      } else {
        errorToast("Could not fetch this event's tickets. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch this event's tickets. Try again later.")
    } finally {
      setIsLoadingSales(false)
    }
  }

  const onPublishEvent = async () => {
    setPublishEventLoading(true)
    try {
      const res = await publishEventFn(selectedEvent?.eventId)
      if (res?.data?.status === 200) {
        successToast("Your event is live!")
      } else {
        errorToast(res?.data?.message)
      }
    } catch (err) {
      errorToast("Could not publish event. Try again later.")
    } finally {
      setPublishEventLoading(false)
    }
  }
  return (
    <EventPagesWrapper
      right={
        <div className="text-neutralDark">
          <div>
            <Dialog>
              <DialogTrigger>
                <CustomButton className=" w-auto">Publish Event</CustomButton>
              </DialogTrigger>
              <DialogContent className="rounded-lg">
                <DialogHeader>
                  <DialogTitle>Publish Event?</DialogTitle>
                  <DialogDescription className="mt-4">
                    <p className="mt-4 text-base text-left">
                      This will make your event live and tickets will be visible to the public.
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row items-center justify-end">
                  <DialogClose className="mr-4">Cancel</DialogClose>
                  <CustomButton className="mt-auto w-auto ml-4 flex flex-row items-center" onClick={onPublishEvent}>
                    {publishEventLoading ? <>
                    <Loader2 size={15} className="animate-spin"/>
                    <span className="ml-2">Publishing...</span>
                    </>
                    : (<>
                    <Rocket size={15} />
                    <span className="ml-2">Publish</span>
                    </>)}
                    
                  </CustomButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      }
    >
      <div className="border p-4 rounded-md">
        {
          // eslint-disable-next-line no-constant-condition
          true ? (
            <TabGroup className="">
              <TabList color="violet">
                <Tab>Sales</Tab>
                <Tab>Transactions</Tab>
                <Tab>Attendees</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Grid numItemsLg={2} className="mt-6 gap-6 flex flex-row max-[860px]:flex-col">
                      <Card >
                        <Flex alignItems="start">
                          <div className="truncate">
                            <Text>Sales</Text>
                            {isLoadingSales ? (
                              <Loader2 size={25} className="animate-spin mt-4 text-mainPrimary"/>
                            ) : (
                              <Metric className="truncate">KES {usNumberformatter(totalSales)}</Metric>
                            )}
                          </div>
                          {/* <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta> */}
                        </Flex>
                        {/* TODO: Restore this once the "target" feature is ready */}
                        {/* <Flex className="mt-4 space-x-2">
                          <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                          <Text>{item.target}</Text>
                        </Flex>
                        <ProgressBar value={item.progress} className="mt-2" color="orange" /> */}
                      </Card>
                  </Grid>
                  <TicketsSoldBarChart />
                </TabPanel>
                <TransactionsTab />
                <AttendeesTab />
              </TabPanels>
            </TabGroup>
          ) : (
            <div className="h-auto w-auto flex flex-col items-center mt-[5em]">
              <div>
                <img src={CalendarImage} alt="calendar" className="h-[20em] w-[30em]" />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-[25px] font-semibold">Oops! No Data yet</h2>
                <p className="mt-[1em] text-[#6D7175] text-[1.1em]">
                  This section will be updated as soon as you start selling tickets
                </p>
              </div>
            </div>
          )
        }
      </div>
    </EventPagesWrapper>
  )
}

export default EventDashBoard
