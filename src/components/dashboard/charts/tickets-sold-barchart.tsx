import { getSuccessfulSalesInPeriod } from "@/src/api-calls/dashboard"
import { errorToast } from "@/src/lib/utils"
import { Card, Title, Subtitle, BarChart, Tab, TabGroup, TabList, Flex } from "@tremor/react"
import moment from "moment"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const valueFormatter = (number: number) =>
  `${new Intl.NumberFormat("us").format(number).toString()}`

const TicketsSoldBarChart = ({ticketSalesByType}: any) => {
  const [totalSales, setTotalSales] = useState<any>([])
  // const [ticketSalesByType, setTicketSalesByType] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPeriod, setSelectedPeriod] = useState({
    startDate: moment().clone().subtract(14, "days").format("YYYY-MM-DD"),
    endDate: moment().endOf("day").format("YYYY-MM-DD"),
  })
  const params = useParams()

  useEffect(() => {
    fetchSalesInPeriod(params.id)
  }, [])

  const fetchSalesInPeriod = async (eventId: string | undefined) => {
    try {
      const res = await getSuccessfulSalesInPeriod({ eventId, selectedPeriod })
      if (res.status === 200) {
        // const sales = res.data.sales
        const response = {
          "status": 200,
          "message": "Successful sales per day",
          "data": {
              "sales": [
                  {
                      "date": "2024-09-01",
                      "sales": "167"
                  },
                  {
                      "date": "2024-08-31",
                      "sales": "161"
                  },
                  {
                      "date": "2024-08-30",
                      "sales": "121"
                  },
                  {
                      "date": "2024-08-29",
                      "sales": "27"
                  },
                  {
                      "date": "2024-08-28",
                      "sales": "17"
                  },
                  {
                      "date": "2024-08-27",
                      "sales": "7"
                  },
                  {
                      "date": "2024-08-26",
                      "sales": "21"
                  },
                  {
                      "date": "2024-08-25",
                      "sales": "19"
                  },
                  {
                      "date": "2024-08-24",
                      "sales": "7"
                  },
                  {
                      "date": "2024-08-23",
                      "sales": "8"
                  },
                  {
                      "date": "2024-08-22",
                      "sales": "3"
                  },
                  {
                      "date": "2024-08-21",
                      "sales": "4"
                  },
                  {
                      "date": "2024-08-20",
                      "sales": "5"
                  },
                  {
                      "date": "2024-08-19",
                      "sales": "1"
                  },
                  {
                      "date": "2024-08-18",
                      "sales": "72"
                  }
              ]
          }
      }
        setTotalSales(response.data.sales)
      } else {
        errorToast("Could not fetch this event's sales. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch this event's sales. Try again later.")
    }
  }


  return (
    <div className="mt-6">
      <Card>
        <div className="md:flex justify-between">
          <div>
            <Flex
              className="space-x-0.5"
              justifyContent="start"
              alignItems="start"
              flexDirection="col"
            >
              <Title>Total Tickets Sold</Title>
              {selectedIndex === 0 && (
                <Subtitle>
                  Tickets sold between {moment(selectedPeriod.startDate).format("MMM Do")} and{" "}
                  {moment(selectedPeriod.endDate).format("MMM Do")}
                </Subtitle>
              )}
            </Flex>
          </div>
          <div>
            <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
              <TabList color="gray" variant="solid">
                <Tab value={0}>Tickets Sale</Tab>
                <Tab value={1}>Ticket Sale By Type</Tab>
              </TabList>
            </TabGroup>
          </div>
        </div>
        {selectedIndex === 0 && (
          <BarChart
            className="mt-6"
            data={totalSales}
            index="date"
            categories={["sales"]}
            colors={["violet"]}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
          />
        )}

        {selectedIndex === 1 && (
          <BarChart
            className="mt-6"
            data={ticketSalesByType}
            index="name"
            categories={["tickets"]}
            colors={["violet"]}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
          />
        )}
      </Card>
    </div>
  )
}

export default TicketsSoldBarChart
