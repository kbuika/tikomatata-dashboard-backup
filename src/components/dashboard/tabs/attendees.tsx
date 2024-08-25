import { getAttendeesForEvent } from "@/src/api-calls/dashboard"
import { useTabAwareSearchParamsState } from "@/src/hooks/useTabAwareSearchParamsState"
import { errorToast } from "@/src/lib/utils"
import { InformationCircleIcon } from "@heroicons/react/solid"
import {
  Flex,
  Icon,
  TabPanel,
  Title
} from "@tremor/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AttendeeColumns } from "../../table-columns/attendees-columns"
import { DataTable } from "../../ui/data-table/data-table"


const AttendeesTab = () => {
  const [allAttendees, setAllAttendees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentTablePage, setCurrentTablePage] = useTabAwareSearchParamsState("page", 0, "attendees")
  const [totalTablePages, setTotalTablePages] = useState<number>(1)
  const params = useParams()

  useEffect(() => {
    fetchAllAttendees(params.id, currentTablePage)
  }, [currentTablePage])

  const fetchAllAttendees = async (eventId: string | undefined, currentTablePage: number | string) => {
    setIsLoading(true)
    try {
      const res = await getAttendeesForEvent({ eventId, page: +currentTablePage })
      if (res.status === 200) {
        const { attendees, totalPages } = res.data[0]
        setAllAttendees(attendees || [])
        setTotalTablePages(totalPages || 1)
        setCurrentTablePage(currentTablePage)
      } else {
        errorToast("Could not fetch this event's attendees. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch this event's attendees. Try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TabPanel>
      <div className="mt-6">
          <>
          <div className="flex flex-row pb-4">
            <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
              <Title> Attendees List</Title>
              <Icon
                icon={InformationCircleIcon}
                variant="simple"
                tooltip="Shows a list of all attendees for this event"
              />
            </Flex>
          </div>
        <DataTable
            columns={AttendeeColumns}
            data={allAttendees}
            dataloading={isLoading}
            totalTablePages={totalTablePages}
            setTablePage={setCurrentTablePage}
            tablePage={currentTablePage as number}
          />
          </>
      </div>
    </TabPanel>
  )
}

export default AttendeesTab
