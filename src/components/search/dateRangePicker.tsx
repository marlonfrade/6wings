'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

interface DateRangePickerProps {
  className?: string
  tripType: string
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
}

export function DateRangePicker({
  className,
  tripType,
  dateRange,
  onDateRangeChange
}: DateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              tripType === 'roundTrip' ? (
                <>
                  {format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })} -{' '}
                  {dateRange.to
                    ? format(dateRange.to, 'dd/MM/yyyy', { locale: ptBR })
                    : 'Selecione a volta'}
                </>
              ) : (
                format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })
              )
            ) : (
              'Selecione as datas'
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {tripType === 'roundTrip' ? (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              locale={ptBR}
            />
          ) : (
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={dateRange?.from}
              selected={dateRange?.from}
              onSelect={(date) =>
                onDateRangeChange(date ? { from: date } : undefined)
              }
              numberOfMonths={2}
              locale={ptBR}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
