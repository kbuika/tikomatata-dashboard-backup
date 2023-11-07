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
  Title,
  Badge,
} from "@tremor/react"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { StatusOnlineIcon } from "@heroicons/react/outline"
import moment from "moment"

interface TransactionType {
  createdOn: string
  paidAt: string
  amount: string
  transactionId: string
  recipientName: string
  recipientEmail: string
  transactionStatus: string
}

// TODO: add pagination
// Optimize API calls
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
                  <TableHeaderCell className="text-left">Paid At</TableHeaderCell>
                  <TableHeaderCell className="text-left">Created On</TableHeaderCell>
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
                            <TableCell className="text-left">{item.recipientName}</TableCell>
                            <TableCell className="text-left">{item.recipientEmail}</TableCell>
                            <TableCell className="text-left">{item?.paidAt ?  moment(item?.paidAt).format("DD-MM-YY HH:mm") : "No date"}</TableCell>
                            <TableCell className="text-left">{item?.createdOn ? moment(item?.createdOn).format("DD-MM-YY HH:mm") : "No date"}</TableCell>
                            <TableCell className="text-left">
                              <Badge
                                color={item?.transactionStatus === "SUCCESSFUL" ? "emerald" : "red"}
                                icon={StatusOnlineIcon}
                              >
                                {item.transactionStatus.toLowerCase()}
                              </Badge>
                            </TableCell>
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
