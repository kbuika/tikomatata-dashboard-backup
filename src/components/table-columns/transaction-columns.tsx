import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@tremor/react"
import { StatusOnlineIcon } from "@heroicons/react/outline"

import { DataTableColumnHeader } from "../ui/data-table/data-table-column-header"
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

export const TransactionColumns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "transactionId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[160px]">{row.getValue("transactionId")}</div>,
    enableSorting: false,
    enableHiding: false,
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
    },
  },
  {
    accessorKey: "transactionStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("transactionStatus") as string
      return (
        <div className="flex w-[100px] items-center">
          <Badge color={status === "SUCCESSFUL" ? "emerald" : "red"} icon={StatusOnlineIcon}>
            {status.toLowerCase()}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "paidAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Paid At" />,
    cell: ({ row }) => {
      const paidAt = row.getValue("paidAt") as string
      if (!paidAt) return ""
      return (
        <div className="flex w-[100px] items-center">{moment(paidAt).format("DD-MM-YY HH:mm")}</div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
