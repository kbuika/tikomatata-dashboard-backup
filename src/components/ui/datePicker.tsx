"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"

type DatePickerProps = {
  className?: any
  onChange?: (date: Date | undefined) => void // Add the onChange prop
  defaultDate?: Date | string | undefined
}

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  onChange,
  defaultDate = new Date(),
  ...props
}) => {
  const [date, setDate] = React.useState<Date | null>(new Date(defaultDate))

  const handleDateSelect = (selectedDate?: Date) => {
    setDate(selectedDate || null)
    if (onChange) {
      onChange(selectedDate || undefined)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={handleDateSelect}
          initialFocus
          disabled={{ before: new Date() }}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
