import { Table } from "@tanstack/react-table"
import {
  // CheckCircledIcon,
  // CircleIcon,
  // CrossCircledIcon,
  // QuestionMarkCircledIcon,
  // StopwatchIcon,
  Cross2Icon,
} from "@radix-ui/react-icons"

import { Button } from "../button"
import { Input } from "../shad-input"
import { DataTableViewOptions } from "./data-table-view-options"

// import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by Email..."
          value={(table.getColumn("recipientEmail")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("recipientEmail")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("transactionStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("transactionStatus")}
            title="Status"
            options={statuses}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
