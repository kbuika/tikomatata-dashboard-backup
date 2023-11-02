"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

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
  const [defaultDate2, setDefaultDate2] = React.useState<Date>(new Date(defaultDate))

  const handleDateSelect = (selectedDate?: Date) => {
    setDate(selectedDate || null)
    setDefaultDate2(selectedDate || new Date(defaultDate))
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
            !date || !defaultDate2 && "text-muted-foreground",
            className,
          )}
          onClick={() => setDefaultDate2(new Date(defaultDate))}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {defaultDate2 ? format(defaultDate2, "PPP") : <>{date ? format(date, "PPP") : <span>Pick a date</span>}</>}
          {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={defaultDate2 || undefined}
          onSelect={handleDateSelect}
          initialFocus
          defaultMonth={defaultDate2 || undefined}
          disabled={{ before: defaultDate2 }}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
