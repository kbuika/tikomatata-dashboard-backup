import { getTransactionsForEvent } from "@/src/api-calls/dashboard"
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
  Title
} from "@tremor/react"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface TransactionType {
  createdAt: string
  paidAt: string
  transactionId: string
  ticketRecipientName: string
  ticketRecipientEmail: string
  transactionStatus: string
}

const TransactionsTab = () => {
  const [alltransactions, setAllTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    // if(allTickets.length > 0) {
    //   setEventTickets(allTickets)
    // }else {
    fetchAllTransactions(params.id)
    // }
  }, [])

  const fetchAllTransactions = async (eventId: string | undefined) => {
    setIsLoading(true)
    try {
      const res = await getTransactionsForEvent({ eventId }) //TODO: add pagination
      if (res.status === 200) {
        setAllTransactions(res.data?.[0].transactions || [])
      } else {
        errorToast("Could not fetch this event's transactions. Try again later.")
      }
    } catch (error) {
      errorToast("Could not fetch this event's transactions. Try again later.")
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
                <Title> Transactions List</Title>
                <Icon
                  icon={InformationCircleIcon}
                  variant="simple"
                  tooltip="Shows a list of all transactions for this event"
                />
              </Flex>
              {/* <div className="flex flex-row items-center text-sm cursor-pointer">
                <Download size={15} />
                <span className="ml-2">Download</span>
              </div> */}
            </div>
            <Table className="mt-6">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>ID</TableHeaderCell>
                  <TableHeaderCell className="text-left">Name</TableHeaderCell>
                  <TableHeaderCell className="text-left">Email</TableHeaderCell>
                  <TableHeaderCell className="text-left">Status</TableHeaderCell>
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
                    {alltransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No transactions yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {alltransactions.map((item: TransactionType) => (
                          <TableRow key={item.transactionId}>
                            <TableCell>{item.transactionId}</TableCell>
                            <TableCell className="text-left">{item.ticketRecipientName}</TableCell>
                            <TableCell className="text-left">{item.ticketRecipientEmail}</TableCell>
                            <TableCell className="text-left">{item.transactionStatus}</TableCell>
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

export default TransactionsTab
