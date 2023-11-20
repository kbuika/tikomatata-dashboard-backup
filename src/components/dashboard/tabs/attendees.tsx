import { getAttendeesForEvent } from "@/src/api-calls/dashboard"
import { errorToast } from "@/src/lib/utils"
import { InformationCircleIcon } from "@heroicons/react/solid"
import {
  Card,
  Flex,
  Icon,
  TabPanel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface AttendeesType {
  amount: string
  ticketName: string
  recipientName: string
  recipientEmail: string
  recipientPhoneNumber: string
}

const AttendeesTab = () => {
  const [allAttendees, setAllAttendees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    fetchAllAttendees(params.id)
  }, [])

  const fetchAllAttendees = async (eventId: string | undefined) => {
    setIsLoading(true)
    try {
      const res = await getAttendeesForEvent({ eventId })
      if (res.status === 200) {
        setAllAttendees(res.data?.[0].attendees || [])
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
        <Card>
          <>
            <div className="flex flex-row">
              <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                <Title> Attendees List</Title>
                <Icon
                  icon={InformationCircleIcon}
                  variant="simple"
                  tooltip="Shows a list of all attendees for this event"
                />
              </Flex>
            </div>
            <Table className="mt-6">
              <TableHead>
                <TableRow>
                  {/* <TableHeaderCell>ID</TableHeaderCell> */}
                  <TableHeaderCell>Ticket Type</TableHeaderCell>
                  <TableHeaderCell className="text-left">Name</TableHeaderCell>
                  <TableHeaderCell className="text-left">Email</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={1} className="text-center">
                      <Loader2 size={20} className="animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {allAttendees.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No attendees yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {allAttendees.map((item: AttendeesType) => (
                          <TableRow key={item.recipientEmail}>
                            <TableCell>{item.ticketName}</TableCell>
                            <TableCell className="text-left">{item.recipientName}</TableCell>
                            <TableCell className="text-left">{item.recipientEmail}</TableCell>
                            {/* <TableCell className="text-left">{item.transactionStatus}</TableCell> */}
                          </TableRow>
                        ))}
                      </>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </>
        </Card>
      </div>
    </TabPanel>
  )
}

export default AttendeesTab
