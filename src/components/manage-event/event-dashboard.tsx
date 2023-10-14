import CustomButton from "../ui/custom-button"
import EventPagesWrapper from "@/src/layouts/wrappers/event-pages-wrapper"
import CalendarImage from "../../assets/images/calendar.png"
import { InformationCircleIcon } from "@heroicons/react/solid"
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  BadgeDelta,
  DeltaType,
  Flex,
  Metric,
  AreaChart,
  Color,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react"
import { useState } from "react"
import { Download, Loader2, Rocket } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { useEventsStore } from "@/src/stores/events-store"
import { publishEventFn } from "@/src/api-calls"
import { errorToast, successToast } from "@/src/lib/utils"

type Kpi = {
  title: string
  metric: string
  progress: number
  target: string
  delta: string
  deltaType: DeltaType
}

const kpiData: Kpi[] = [
  {
    title: "Sales",
    metric: "KES 0",
    progress: 15.9,
    target: "KES 80,000",
    delta: "0%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Attendees",
    metric: "0",
    progress: 53.6,
    target: "2,000",
    delta: "0%",
    deltaType: "moderateDecrease",
  },
]

const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat("us", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString()

const formatters: { [key: string]: any } = {
  Sales: (number: number) => `KES ${usNumberformatter(number)}`,
  Attendees: (number: number) => `${usNumberformatter(number)}`,
  Delta: (number: number) => `${usNumberformatter(number, 2)}%`,
}

const Kpis = {
  Sales: "Sales",
  Attendees: "Attendees",
}

const kpiList = [Kpis.Sales, Kpis.Attendees]

export type DailyPerformance = {
  date: string
  Sales: number
  Attendees: number
}

export const performance: DailyPerformance[] = [
  // {
  //   date: "2023-05-01",
  //   Sales: 900.73,
  //   Attendees: 73,
  // },
  // {
  //   date: "2023-05-02",
  //   Sales: 1000.74,
  //   Attendees: 74,
  // },
  // {
  //   date: "2023-05-03",
  //   Sales: 1100.93,
  //   Attendees: 293,
  // },
  // {
  //   date: "2023-05-04",
  //   Sales: 1200.9,
  //   Attendees: 29,
  // },
]

export type Attendee = {
  name: string
  email: string
  dateOfPurchase: string
  ticketType: string
}

export const AttendeesList: Attendee[] = [
  // {
  //   name: "Peter Doe",
  //   email: "peter@doe.com",
  //   dateOfPurchase: "23/07",
  //   ticketType: "Regular",
  // },
  // {
  //   name: "Peter Doe",
  //   email: "peter@doe.com",
  //   dateOfPurchase: "23/07",
  //   ticketType: "Regular",
  // },
  // {
  //   name: "Peter Doe",
  //   email: "peter@doe.com",
  //   dateOfPurchase: "23/07",
  //   ticketType: "Regular",
  // },
  // {
  //   name: "Peter Doe",
  //   email: "peter@doe.com",
  //   dateOfPurchase: "23/07",
  //   ticketType: "Regular",
  // },
]

const EventDashBoard = () => {
  const [publishEventLoading, setPublishEventLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const selectedKpi = kpiList[selectedIndex]

  const areaChartArgs = {
    className: "mt-5 h-72",
    data: performance,
    index: "date",
    categories: [selectedKpi],
    colors: ["orange"] as Color[],
    showLegend: false,
    valueFormatter: formatters[selectedKpi],
    yAxisWidth: 56,
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
                <Tab>Overview</Tab>
                <Tab>Detail</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Grid numItemsLg={2} className="mt-6 gap-6 flex flex-row max-[860px]:flex-col">
                    {kpiData.map((item) => (
                      <Card key={item.title}>
                        <Flex alignItems="start">
                          <div className="truncate">
                            <Text>{item.title}</Text>
                            <Metric className="truncate">{item.metric}</Metric>
                          </div>
                          <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
                        </Flex>
                        {/* TODO: Restore this once the "target" feature is ready */}
                        {/* <Flex className="mt-4 space-x-2">
                          <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                          <Text>{item.target}</Text>
                        </Flex>
                        <ProgressBar value={item.progress} className="mt-2" color="orange" /> */}
                      </Card>
                    ))}
                  </Grid>
                  <div className="mt-6">
                    <Card>
                      <>
                        <div className="md:flex justify-between">
                          <div>
                            <Flex
                              className="space-x-0.5"
                              justifyContent="start"
                              alignItems="center"
                            >
                              <Title> Sales History ( work in progress) </Title>
                            </Flex>
                            <Text> Daily change for sales </Text>
                          </div>
                          <div>
                            <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
                              <TabList color="gray" variant="solid">
                                <Tab value={""}>Sales</Tab>
                                <Tab>Attendees</Tab>
                              </TabList>
                            </TabGroup>
                          </div>
                        </div>
                        {/* web */}
                        <div className="mt-8 hidden sm:block">
                          <AreaChart {...areaChartArgs} colors={["violet"]}/>
                        </div>
                        {/* mobile */}
                        <div className="mt-8 sm:hidden">
                          <AreaChart
                            {...areaChartArgs}
                            startEndOnly={true}
                            showGradient={false}
                            showYAxis={false}
                            colors={["violet"]}
                          />
                        </div>
                      </>
                    </Card>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="mt-6">
                    <Card>
                      <>
                        <div className="flex flex-row">
                          <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                            <Title> Attendees List (Work in progress)</Title>
                            <Icon
                              icon={InformationCircleIcon}
                              variant="simple"
                              tooltip="Shows a list of tickets purchased for this event"
                            />
                          </Flex>
                          <div className="flex flex-row items-center text-sm cursor-pointer">
                            <Download size={15} />
                            <span className="ml-2">Download</span>
                          </div>
                        </div>

                        <Table className="mt-6">
                          <TableHead>
                            <TableRow>
                              <TableHeaderCell>Name</TableHeaderCell>
                              <TableHeaderCell className="text-left">Email</TableHeaderCell>
                              <TableHeaderCell className="text-left">
                                Date of Purchase
                              </TableHeaderCell>
                              <TableHeaderCell className="text-left">Ticket Type</TableHeaderCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {AttendeesList.map((item) => (
                              <TableRow key={item.name}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-left">{item.email}</TableCell>
                                <TableCell className="text-left">{item.dateOfPurchase}</TableCell>
                                <TableCell className="text-left">{item.ticketType}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </>
                    </Card>
                  </div>
                </TabPanel>
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
