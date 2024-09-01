import { getUserInfo } from "@/src/api-calls"
import { getTotalSales, getTotalTicketSalesByType } from "@/src/api-calls/dashboard"
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
  Text,
} from "@tremor/react"
import { Loader2, Rocket } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
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
// import { useSearchParamsState } from "@/src/hooks/useSearchParamsState"
import RequestPublishEmail from "../../email-templates/request-publish-email"
import { render } from "@react-email/render"
import { Button } from "../ui/button"
import PageViewsBarChart from "../dashboard/charts/pageviews-barchart"

const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat("us", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString()

const getActiveTabIndex = (tabIndex: string): number => {
  if (tabIndex.toLocaleLowerCase() == "sales") return 0
  if (tabIndex.toLocaleLowerCase() == "transactions") return 1
  if (tabIndex.toLocaleLowerCase() == "attendees") return 2
  if (tabIndex.toLocaleLowerCase() == "pageviews") return 3
  return 0
}


const EventDashBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("dashTab") || "sales");
  const [publishEventLoading, setPublishEventLoading] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [ticketSalesByType, setTicketSalesByType] = useState<any>([]);
  const [totalTicketsSale, setTotalTicketsSale] = useState(0);
  const [isLoadingSales, setIsLoadingSales] = useState(false);
  const selectedEvent = useEventsStore((state) => state.selectedEvent);
  const params = useParams();

  useEffect(() => {
    fetchAllSales(params.id);
    fetchTicketSalesByType(params.id);
  }, []);

  useEffect(() => {
    const currentTab = searchParams.get("dashTab");
    if (currentTab !== activeTab) {
      setSearchParams(prev => {
        prev.set("dashTab", activeTab);
        return prev;
      }, { replace: true });
    }
  }, [activeTab, searchParams, setSearchParams]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  const fetchAllSales = async (eventId: string | undefined) => {
    setIsLoadingSales(true);
    try {
      const res = {
        "status": 200,
        "message": "Total sales calculated",
        "data": {
            "totalAmount": 1007367.0
        },
        "eventId": eventId
    }
      if (res.status === 200) {
        setTotalSales(res.data.totalAmount);
      } else {
        errorToast("Could not fetch this event's sales. Try again later.");
      }
    } catch (error) {
      errorToast("Could not fetch this event's sales. Try again later.");
    } finally {
      setIsLoadingSales(false);
    }
  };

  const onRequestPublishEvent = async () => {
    setPublishEventLoading(true);

    try {
      const res = await getUserInfo();
      if (res?.status === 200) {
        const emailHtml = render(RequestPublishEmail({ event: selectedEvent, user: res?.data }));

        const emailRes = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors", // disable cors
          body: JSON.stringify({ emailHtml, subject: "Request to publish event" }),
        });
        if (emailRes.status === 200) {
          successToast(`Your request to publish ${selectedEvent?.name} has been sent!`, false);
        }
      } else {
        errorToast(`Could not send your request to publish ${selectedEvent?.name}.`, false);
      }
    } catch (err) {
      errorToast("Could not publish event. Try again later.");
    } finally {
      setPublishEventLoading(false);
      setPublishDialogOpen(false);
    }
  };

  const fetchTicketSalesByType = async (eventId: string | undefined) => {
    try {
      const res = {
        "status": 200,
        "message": "Sale by ticket types",
        "data": {
            "totalTicketsSold": 781,
            "ticketsSoldByType": [
                {
                    "name": "Wadau",
                    "tickets": 150
                },
                {
                    "name": "Flash Sale Wadau",
                    "tickets": 406
                },
                {
                    "name": "Flash Sale Army of Three",
                    "tickets": 19
                },
                {
                    "name": "Couple Ticket",
                    "tickets": 36
                },
                {
                    "name": "Flash Couple Tickets",
                    "tickets": 46
                },
                {
                    "name": "Army of Three [Group of 3]",
                    "tickets": 11
                },
                {
                    "name": "Flash Sale Wadau (1)",
                    "tickets": 113
                }
            ]
        },
        "eventId": eventId
    }
      if (res.status === 200) {
        setTicketSalesByType(res.data.ticketsSoldByType);
        setTotalTicketsSale(res.data.totalTicketsSold);
      } else {
        errorToast("Could not fetch this event's ticket sales by type. Try again later.");
      }
    } catch (error) {
      errorToast("Could not fetch this event's ticket sales by type. Try again later.");
    }
  };

  return (
    <EventPagesWrapper
      right={
        <div className="text-neutralDark">
          <div>
            {selectedEvent?.published ? (
              <Button disabled={true} className="bg-mainPrimary">
                Unpublish
              </Button>
            ) : (
              <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
                <DialogTrigger>
                  <CustomButton className=" w-auto">Publish Event</CustomButton>
                </DialogTrigger>
                <DialogContent className="rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Publish Event?</DialogTitle>
                    <DialogDescription className="mt-4">
                      <p className="mt-4 text-base text-left">
                        This will send a review request before your event goes live.
                      </p>
                      <div className="mt-4 text-base text-left mt-2">
                        This review can take between 30 minutes to 3 hours. Incase you&apos;d like a
                        quick review, please contact support
                        <ul className="mt-4">
                          <li>
                            {" "}
                            Dennis -{" "}
                            <a href="mailTo:denno@tikomatata.com" className="underline">
                              denno@tikomatata.com
                            </a>
                            ,{" "}
                            <a href="phone:0110733776" className="underline">
                              0110733776
                            </a>
                          </li>
                          <li>
                            Kibuika -{" "}
                            <a href="mailTo:kibuika@tikomatata.com" className="underline">
                              kibuika@tikomatata.com
                            </a>
                            ,{" "}
                            <a href="phone:+254740459940" className="underline">
                              0740459940
                            </a>
                          </li>
                        </ul>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row items-center justify-end">
                    <DialogClose className="mr-4">Cancel</DialogClose>
                    <CustomButton
                      className="mt-auto w-auto ml-4 flex flex-row items-center"
                      onClick={onRequestPublishEvent}
                    >
                      {publishEventLoading ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          <span className="ml-2">Requesting...</span>
                        </>
                      ) : (
                        <>
                          <Rocket size={15} />
                          <span className="ml-2">Request</span>
                        </>
                      )}
                    </CustomButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      }
    >
      <div className="border p-4 rounded-md">
        {
          // FIXME: Proper conditional rendering
          // eslint-disable-next-line no-constant-condition
          true ? (
            <TabGroup
              className=""
              defaultIndex={getActiveTabIndex(activeTab)}
              onIndexChange={(index) => handleTabChange(["sales", "transactions", "attendees", "pageviews"][index])}
            >
              <TabList color="violet">
                <Tab>Sales</Tab>
                <Tab>Transactions</Tab>
                <Tab>Attendees</Tab>
                <Tab>Page Views</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {activeTab === "sales" && (
                    <>
                      <Grid
                        numItemsLg={2}
                        className="mt-6 gap-6 flex flex-row max-[860px]:flex-col"
                      >
                        <Card>
                          <Flex alignItems="start">
                            <div className="truncate">
                              <Text>Sales</Text>
                              {isLoadingSales ? (
                                <Loader2 size={25} className="animate-spin mt-4 text-mainPrimary" />
                              ) : (
                                <Metric className="truncate">
                                  KES {usNumberformatter(totalSales)}
                                </Metric>
                              )}
                            </div>
                          </Flex>
                        </Card>
                        <Card>
                          <Flex alignItems="start">
                            <div className="truncate">
                              <Text>Total Tickets Sold</Text>
                              {isLoadingSales ? (
                                <Loader2 size={25} className="animate-spin mt-4 text-mainPrimary" />
                              ) : (
                                <Metric className="truncate">
                                  {usNumberformatter(totalTicketsSale)}
                                </Metric>
                              )}
                            </div>
                          </Flex>
                        </Card>
                      </Grid>
                      <TicketsSoldBarChart ticketSalesByType={ticketSalesByType} />
                    </>
                  )}
                </TabPanel>

                <TabPanel>{activeTab === "transactions" && <TransactionsTab />}</TabPanel>
                <TabPanel>{activeTab === "attendees" && <AttendeesTab />}</TabPanel>
                <TabPanel>{activeTab === "pageviews" && <PageViewsBarChart />}</TabPanel>
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
  );
};

export default EventDashBoard
