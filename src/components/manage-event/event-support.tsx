/* eslint-disable @typescript-eslint/no-unused-vars */
import { getEventTicketEmails, resendOrderEmail } from "@/src/api-calls/support"
import EventPagesWrapper from "@/src/layouts/wrappers/event-pages-wrapper"
import { errorToast, successToast } from "@/src/lib/utils"
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
import { Loader2 } from "lucide-react"
import { DataTable } from "../ui/data-table/data-table"
import { useTabAwareSearchParamsState } from "@/src/hooks/useTabAwareSearchParamsState"
import { createSupportColumns } from "../table-columns/support-columns"

export interface EmailDataType {
  emailBody?: string
  emailId: string
  emailRecipient: number
  emailStatus: string
  numberOfRetries: number
}

const EventSupport = () => {
  const [allEmails, setAllEmails] = useState([])
  const [resendingEmail, setResendingEmail] = useState(false)
  const [selectedEmailOrder, setSelectedEmailOrder] = useState<EmailDataType>()
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const [currentTablePage, setCurrentTablePage] = useTabAwareSearchParamsState("page", 0, "support")
  const [totalTablePages, setTotalTablePages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()

  useEffect(() => {
    fetchEventTicketEmails(params.id, currentTablePage)
  }, [currentTablePage])

  const fetchEventTicketEmails = async (eventId: string | undefined, currentTablePage: number | string) => {
    try {
      const res = await getEventTicketEmails({ eventId, page: +currentTablePage })
      if (res.status === 200) {
        const { totalPages, emails } = res.data
        setAllEmails(emails)
        setTotalTablePages(totalPages || 1)
        setCurrentTablePage(currentTablePage)
      } else {
        errorToast("Could not fetch this event's sales. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch this event's sales. Try again later.")
    }
  }

  const resendUserOrderEmail = async (emailOrder: EmailDataType) => {
    setSelectedEmailOrder(emailOrder)
    setResendingEmail(true)
    const eventId = params.id
    const emailId = emailOrder?.emailId
    try {
      const res = await resendOrderEmail({ eventId, emailId })
      if (res.status === 200) {
        successToast(`Order email resent to ${emailOrder?.emailRecipient}`)
      } else {
        errorToast(`Could not resend email to ${emailOrder?.emailRecipient}`)
      }
    } catch (error) {
      errorToast(`Could not resend email to ${emailOrder?.emailRecipient}`)
    } finally {
      setResendingEmail(false)
    }
  }

  const columns = createSupportColumns(resendUserOrderEmail, selectedEmailOrder, resendingEmail)

  return (
    <EventPagesWrapper>
      <div className="border h-auto rounded-md p-4">
          <Title>{selectedEvent?.name} Support</Title>
          <DataTable
            columns={columns}
            data={allEmails}
            dataloading={isLoading}
            totalTablePages={totalTablePages}
            setTablePage={setCurrentTablePage}
            tablePage={currentTablePage as number}
          />
      </div>
    </EventPagesWrapper>
  )
}

export default EventSupport
