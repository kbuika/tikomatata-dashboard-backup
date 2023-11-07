import { getSuccessfulSalesInPeriod } from "@/src/api-calls/dashboard"
import { errorToast } from "@/src/lib/utils"
import { Card, Title, Subtitle, BarChart} from "@tremor/react"
import moment from "moment"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const valueFormatter = (number: number) =>
  `${new Intl.NumberFormat("us").format(number).toString()}`

const TicketsSoldBarChart = () => {
  const [totalSales, setTotalSales] = useState([])
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
        <Title>Total Tickets Sold</Title>
        <Subtitle>
          Tickets sold between {moment(selectedPeriod.startDate).format("MMM Do")} and{" "}
          {moment(selectedPeriod.endDate).format("MMM Do")}
        </Subtitle>
        <BarChart
          className="mt-6"
          data={totalSales}
          index="date"
          categories={["sales"]}
          colors={["violet"]}
          valueFormatter={valueFormatter}
          yAxisWidth={48}
        />
      </Card>
    </div>
  )
}

export default TicketsSoldBarChart
