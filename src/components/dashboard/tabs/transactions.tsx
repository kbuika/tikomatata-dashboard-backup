import { getTransactionsForEvent } from "@/src/api-calls/dashboard"
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
import { TransactionColumns } from "../../table-columns/transaction-columns"
import { DataTable } from "../../ui/data-table/data-table"
import { useSearchParamsState } from "@/src/hooks/useSearchParamsState"

// Optimize API calls
const TransactionsTab = () => {
  // const [tablePage, setTablePage] = useSearchParamsState("dashTab", "sales")
  const [alltransactions, setAllTransactions] = useState([])
  const [currentTablePage, setCurrentTablePage] = useSearchParamsState("page", 0)
  const [totalTablePages, setTotalTablePages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    fetchAllTransactions(params.id, currentTablePage)
  }, [currentTablePage])

  const fetchAllTransactions = async (eventId: string | undefined, currentTablePage: number | string) => {
    setIsLoading(true)
    try {
      const res = await getTransactionsForEvent({ eventId, page:currentTablePage as number}) //TODO: add pagination
      if (res.status === 200) {
        const { transactions, totalPages} = res.data[0];
        setAllTransactions(transactions || [])
        setTotalTablePages(totalPages || 1)
        setCurrentTablePage(currentTablePage)
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
          <>
            <div className="flex flex-row pb-4">
              <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                <Title> Transactions List</Title>
                <Icon
                  icon={InformationCircleIcon}
                  variant="simple"
                  tooltip="Shows a list of all transactions for this event"
                />
              </Flex>
            </div>
            <DataTable columns={TransactionColumns} data={alltransactions} dataloading={isLoading} totalTablePages={totalTablePages} setTablePage={setCurrentTablePage} tablePage={currentTablePage as number}/>
          </>
      </div>
    </TabPanel>
  )
}

export default TransactionsTab
