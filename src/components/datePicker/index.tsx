"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { OnSelectHandler } from "react-day-picker"

export const DatePicker = ({
  date,
  setDate
}: {
  date: Date | undefined,
  setDate: OnSelectHandler<Date | undefined>
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="bg-gray-50 w-[200px] h-9 rounded-lg border-2 border-[#5EB2BA] focus:border-[#0A8271] text-[#09483F] font-semibold px-3 text-sm shadow-sm transition-all duration-150 cursor-pointer outline-none data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}