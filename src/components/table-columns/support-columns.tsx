import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../ui/data-table/data-table-column-header"
import { EmailDataType } from "../manage-event/event-support"
import { Badge } from "@tremor/react"
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

export const SupportColumns: ColumnDef<EmailDataType>[] = [
  {
    accessorKey: "emailId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email ID" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("emailId")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "emailRecipient",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("emailRecipient")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "numberOfRetries",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Retries" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("numberOfRetries")}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "emailStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("emailStatus") as string
      return (
        <div className="flex w-[100px] items-center">
          <Badge color={status === "SUCCESS" ? "emerald" : "red"} icon={status === "SUCCESS" ? StatusOnlineIcon : StatusOfflineIcon}>
            {status.toLowerCase() == "success" ? "success": "failed"}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]

export const createSupportColumns = (
  resendUserOrderEmail: (emailOrder: EmailDataType) => Promise<void>,
  selectedEmailOrder: EmailDataType | undefined,
  resendingEmail: boolean
): ColumnDef<EmailDataType>[] => [
  ...SupportColumns,
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        onClick={() => resendUserOrderEmail(row.original)}
        disabled={selectedEmailOrder?.emailId === row.original.emailId && resendingEmail}
        className="bg-mainPrimary"
      >
        {selectedEmailOrder?.emailId === row.original.emailId && resendingEmail ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Resend"
        )}
      </Button>
    ),
  },
]
