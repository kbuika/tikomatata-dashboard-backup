"use client"

import { useEffect, useRef, useState, type FC } from "react"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { DateInput } from "./date-input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
// import { Label } from "./label"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: { range: DateRange, rangeCompare?: DateRange }) => void
  /** Initial value for start date */
  initialDateFrom?: Date | string
  /** Initial value for end date */
  initialDateTo?: Date | string
  /** Initial value for start date for compare */
  initialCompareFrom?: Date | string
  /** Initial value for end date for compare */
  initialCompareTo?: Date | string
  /** Alignment of popover */
  align?: "start" | "center" | "end"
  /** Option for locale */
  locale?: string
  /** Option for showing compare feature */
  showCompare?: boolean
}

const formatDate = (date: Date, locale="en-us"): string => {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

interface DateRange {
  from: Date
  to: Date | undefined
}


/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker: FC<DateRangePickerProps> & {
  filePath: string
} = ({
  initialDateFrom = new Date((new Date()).setHours(0, 0, 0, 0)),
  initialDateTo,
  onUpdate,
  align = "end",
  locale = "en-US",
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const [range, setRange] = useState<DateRange>({
    from: new Date((new Date(initialDateFrom)).setHours(0, 0, 0, 0)),
    to: initialDateTo ? new Date((new Date(initialDateTo)).setHours(0, 0, 0, 0)) : new Date((new Date(initialDateFrom)).setHours(0, 0, 0, 0))
  })

  // Refs to store the values of range and rangeCompare when the date picker is opened
  const openedRangeRef = useRef<DateRange | undefined>();

  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  )

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 960)
    }

    window.addEventListener("resize", handleResize)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const resetValues = (): void => {
    setRange({
      from: typeof initialDateFrom === "string" ? new Date(initialDateFrom) : initialDateFrom,
      to: initialDateTo ? (typeof initialDateTo === "string" ? new Date(initialDateTo) : initialDateTo) : (typeof initialDateFrom === "string" ? new Date(initialDateFrom) : initialDateFrom)
    })
  }

  // Helper function to check if two date ranges are equal
  const areRangesEqual = (a?: DateRange, b?: DateRange) => {
    if (!a || !b) return a === b; // If either is undefined, return true if both are undefined
    return (
      a.from.getTime() === b.from.getTime() &&
      (!a.to || !b.to || a.to.getTime() === b.to.getTime())
    );
  };

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
    }
  }, [isOpen]);

  return (
    <Popover modal={true} open={isOpen} onOpenChange={(open: boolean) => {
      if (!open) {
        resetValues()
      }
      setIsOpen(open)
    }}>
      <PopoverTrigger asChild>
        <Button size={"lg"} variant="outline" className="h-[50px] rounded-sm border border-gray-600 focus:border-none focus:outline-none focus:ring-2 focus:ring-mainPrimary">
          <div className="text-right">
            <div className="py-1">
              <div>{`${formatDate(range.from, locale)}${
                (range.to != null) ? " - " + formatDate(range.to, locale) : ""
              }`}</div>
            </div>
          </div>
          <div className="pl-4 opacity-60 -mr-2 scale-125">
            {
              isOpen ? (<ChevronUpIcon width={24} />) : (<ChevronDownIcon width={24} />)
            }
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto z-[2000]">
        <div className="flex py-2">
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row gap-2 px-3 justify-end items-center lg:items-start pb-4 lg:pb-0">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <DateInput
                      value={range.from}
                      onChange={(date) => {
                        const toDate =
                          (range.to == null) || date > range.to ? date : range.to
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: date,
                          to: toDate
                        }))
                      }}
                    />
                    <div className="py-1">-</div>
                    <DateInput
                      value={range.to}
                      onChange={(date) => {
                        const fromDate = date < range.from ? date : range.from
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: fromDate,
                          to: date
                        }))
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Calendar
                  mode="range"
                  onSelect={(value: { from?: Date, to?: Date } | undefined) => {
                    if ((value?.from) != null) {
                      setRange({ from: value.from, to: value?.to })
                    }
                  }}
                  selected={range}
                  numberOfMonths={isSmallScreen ? 1 : 2}
                  disabled={{ before: new Date() }}
                  defaultMonth={
                    new Date(new Date().setMonth(new Date().getMonth() - (isSmallScreen ? 0 : 1)))
                  }
                  className="z-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 py-2 pr-4">
          <Button
            onClick={() => {
              setIsOpen(false)
              resetValues()
            }}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false)
              if (
                !areRangesEqual(range, openedRangeRef.current)
              ) {
                onUpdate?.({ range });
              }
            }}
            className="bg-mainPrimary"
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

DateRangePicker.displayName = "DateRangePicker"
DateRangePicker.filePath =
  "libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx"