import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../ui/data-table/data-table-column-header"

interface AttendeeType {
    amount: string
    ticketName: string
    recipientName: string
    recipientEmail: string
    recipientPhoneNumber: string
  }

export const AttendeeColumns: ColumnDef<AttendeeType>[] = [
{
    accessorKey: "ticketName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ticket Type" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("ticketName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "recipientName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("recipientName")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "recipientEmail",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("recipientEmail")}
          </span>
        </div>
      )
    }
  }
]
