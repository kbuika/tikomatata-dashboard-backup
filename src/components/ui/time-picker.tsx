import * as React from "react"
import { DateTime } from "luxon"
import { TimerIcon } from "lucide-react"

import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { cn } from "../../lib/utils"
import Input from "./Input"

interface TimePickerProps {
  time: string
  setTime: (time: string) => void
}

export const TimePicker: React.FC<TimePickerProps> = ({ time, setTime }) => {
  const [selectedTime, setSelectedTime] = React.useState<DateTime>(
    DateTime.fromFormat(time, "HH:mm", { zone: "utc" }),
  )

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target
    const hours = Number.parseInt(value.split(":")[0] || "00", 10)
    const minutes = Number.parseInt(value.split(":")[1] || "00", 10)
    const modifiedTime = selectedTime.set({ hour: hours, minute: minutes })

    setSelectedTime(modifiedTime)
    setTime(modifiedTime.toFormat("HH:mm"))
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10 border border-input border-gray-600 bg-white ">
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal mt-1",
            !time && "text-muted-foreground",
          )}
        >
          <>
            <TimerIcon className="mr-2 h-4 w-4 mr-4" />
            {time ? selectedTime.toFormat("HH:mm") : <span>Pick a time</span>}
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <>
          <div className="p-2 flex flex-row items-center justify-center w-full">
            <Input
              type="time"
              onChange={handleTimeChange}
              value={selectedTime.toFormat("HH:mm")}
              className="border-mainPrimary w-full"
            />
          </div>
          {!selectedTime && <p>Please pick a time.</p>}
        </>
      </PopoverContent>
    </Popover>
  )
}
