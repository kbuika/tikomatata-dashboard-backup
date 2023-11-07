/* eslint-disable @typescript-eslint/no-unused-vars */
import { getEventTicketEmails } from "@/src/api-calls/support"
import EventPagesWrapper from "@/src/layouts/wrappers/event-pages-wrapper"
import { errorToast } from "@/src/lib/utils"
import { useEventsStore } from "@/src/stores/events-store"
import { StatusOnlineIcon } from "@heroicons/react/outline"
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../ui/button"

interface EmailDataType {
  emailBody?: string
  emailId: string
  emailRecipient: number
  emailStatus: string
  numberOfRetries: number
}

const EventSupport = () => {
  const [allEmails, setAllEmails] = useState([])
  const selectedEvent = useEventsStore((state) => state.selectedEvent)

  const params = useParams()

  useEffect(() => {
    fetchEventTicketEmails(params.id)
  }, [])

  const fetchEventTicketEmails = async (eventId: string | undefined) => {
    try {
      const res = await getEventTicketEmails({ eventId })
      if (res.status === 200) {
        setAllEmails(res.data)
      } else {
        errorToast("Could not fetch this event's sales. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch this event's sales. Try again later.")
    }
  }
  return (
    <EventPagesWrapper>
      <div className="border h-auto rounded-md p-4">
        <Card>
          <Title>{selectedEvent?.name} Support</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Email ID</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Retries</TableHeaderCell>
                <TableHeaderCell>Email Status</TableHeaderCell>
                <TableHeaderCell>Resend Email</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allEmails.map((item: EmailDataType) => (
                <TableRow key={item.emailId}>
                  <TableCell>{item.emailId}</TableCell>
                  <TableCell>
                    <Text>{item.emailRecipient}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.numberOfRetries}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge
                      color={item?.emailStatus === "SUCCESS" ? "emerald" : "red"}
                      icon={StatusOnlineIcon}
                    >
                      {item.emailStatus.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row">
                      <Button disabled={true}>resend</Button>
                      {/* <CustomButton
                    className="bg-mainPrimary text-white ml-2 w-[6em]"
                    onClick={() => console.log("clicked")}
                >
                    Email
                </CustomButton> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </EventPagesWrapper>
  )
}

export default EventSupport
