import { getSuccessfulSalesInPeriod } from "@/src/api-calls/dashboard"
import { errorToast } from "@/src/lib/utils"
import {
    AreaChart,
    Card,
    Color,
    Flex, Title, Tab, TabGroup, TabList
} from "@tremor/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat("us", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString()

const formatters: { [key: string]: any } = {
  sales: (number: number) => `${usNumberformatter(number)}`,
  attendees: (number: number) => `${usNumberformatter(number)}`,
//   Delta: (number: number) => `${usNumberformatter(number, 2)}%`,
}

const Kpis = {
  sales: "sales",
  attendees: "attendees",
}

const kpiList = [Kpis.sales, Kpis.attendees]

// TODO: use this for success and failure transactions charts in the future
const UnusedAreaChart = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [totalSales, setTotalSales] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPeriod, setSelectedPeriod] = useState({
    startDate: "2023-09-13",
    endDate: "2023-09-16",
  })
  const selectedKpi = kpiList[selectedIndex]
  const params = useParams()

  const areaChartArgs = {
    className: "mt-5 h-72",
    data: totalSales,
    index: "date",
    categories: [selectedKpi],
    colors: ["violet"] as Color[],
    showLegend: false,
    valueFormatter: formatters[selectedKpi],
    yAxisWidth: 56,
    minValue: 1,
  }

  useEffect(() => {
    // if(allTickets.length > 0) {
    //   setEventTickets(allTickets)
    // }else {
        fetchSalesInPeriod(params.id)
    // }
  }, [])

  const fetchSalesInPeriod = async (eventId: string | undefined) => {
    try {
      const res = await getSuccessfulSalesInPeriod({ eventId, selectedPeriod})
      console.log(res)
      if (res.status === 200) {
        setTotalSales(res.data.sales)
      } else {
        errorToast("Could not fetch this event's tickets. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch this event's tickets. Try again later.")
    } 
  }

  return (
      <div className="mt-6">
        <Card>
          <>
            <div className="md:flex justify-between">
              <div>
                <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                  <Title>Tickets Sold </Title>
                </Flex>
              </div>
              <div>
                <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
                  <TabList color="gray" variant="solid">
                    <Tab value={""}>All Sales</Tab>
                    <Tab>Sales by Ticket</Tab>
                  </TabList>
                </TabGroup>
              </div>
            </div>
            {/* web */}
            <div className="mt-8 hidden sm:block">
              <AreaChart {...areaChartArgs} colors={["violet"]} noDataText="No data to display"/>
            </div>
            {/* mobile */}
            <div className="mt-8 sm:hidden">
              <AreaChart
                {...areaChartArgs}
                startEndOnly={true}
                showGradient={false}
                showYAxis={false}
                autoMinValue={true}
                colors={["violet"]}
                noDataText="No data to display"
                className="h-auto"
              />
            </div>
          </>
        </Card>

      </div>
  )
}

export default UnusedAreaChart
