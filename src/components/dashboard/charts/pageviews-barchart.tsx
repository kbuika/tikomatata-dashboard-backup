import { getAllPageViews } from "@/src/api-calls/dashboard"
import { errorToast } from "@/src/lib/utils"
import { useEventsStore } from "@/src/stores/events-store"
import { Card, Title, BarChart, Flex } from "@tremor/react"
import moment from "moment"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const valueFormatter = (number: number) =>
  `${new Intl.NumberFormat("us").format(number).toString()}`

const PageViewsBarChart = () => {
  const [totalViews, setTotalViews] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPeriod, setSelectedPeriod] = useState({
    startDate: moment().clone().subtract(14, "days").format("YYYY-MM-DD"),
    endDate: moment().endOf("day").format("YYYY-MM-DD"),
  })
  const selectedEvent = useEventsStore((state) => state.selectedEvent)

  const params = useParams()

  useEffect(() => {
    fetchAllPageViews(params.id)
  }, [])

  const fetchAllPageViews = async (eventId: string | undefined) => {
    try {
      const res = await getAllPageViews({ eventId, selectedPeriod })
      if (res.status === 200) {
        setTotalViews(res.data.views)
      } else {
        errorToast("Could not fetch this event's views. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch this event's views. Try again later.")
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
              <Title>Page Views for {selectedEvent?.name}</Title>
              {/* TODO: Add period for views */}
                {/* <Subtitle>
                  Tickets sold between {moment(selectedPeriod.startDate).format("MMM Do")} and{" "}
                  {moment(selectedPeriod.endDate).format("MMM Do")}
                </Subtitle> */}
            </Flex>
          </div>
        </div>
          <BarChart
            className="mt-6"
            data={totalViews}
            index="date"
            categories={["views"]}
            colors={["violet"]}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
          />
      </Card>
    </div>
  )
}

export default PageViewsBarChart
