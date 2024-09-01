import { getTransactionsForEvent } from "@/src/api-calls/dashboard"
import { errorToast } from "@/src/lib/utils"
import { InformationCircleIcon } from "@heroicons/react/solid"
import { Flex, Icon, TabPanel, Title } from "@tremor/react"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { TransactionColumns } from "../../table-columns/transaction-columns"
import { DataTable } from "../../ui/data-table/data-table"
// import { useSearchParams } from "react-router-dom"

// Optimize API calls
const TransactionsTab = () => {
  const [alltransactions, setAllTransactions] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTablePage, setCurrentTablePage] = useState(Number(searchParams.get("transactionsPage") || "0"));
  const [totalTablePages, setTotalTablePages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    fetchAllTransactions(params.id, currentTablePage)
  }, [currentTablePage, params.id])

  useEffect(() => {
    setSearchParams(prev => {
      prev.set("transactionsPage", currentTablePage.toString());
      return prev;
    }, { replace: true });
  }, [currentTablePage, setSearchParams]);

  const fetchAllTransactions = async (eventId: string | undefined, page: number) => {
    setIsLoading(true)
    try {
      const res = await getTransactionsForEvent({ eventId, page })
      if (res.status === 200) {
        const { transactions, totalPages } = res.data[0]
        setAllTransactions(transactions || [])
        setTotalTablePages(totalPages || 1)
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
          <DataTable
            columns={TransactionColumns}
            data={alltransactions.filter(
              (transaction: any) => transaction.transactionStatus !== "FAILED",
            )}
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

export default TransactionsTab
