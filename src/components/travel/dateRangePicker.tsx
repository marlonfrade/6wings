'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { ptBR, enUS } from 'date-fns/locale'
import { useTranslations, useLocale } from 'next-intl'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

interface DateRangePickerProps {
  selected?: DateRange
  onChange: (range: DateRange | undefined) => void
  className?: string
  mode?: 'single' | 'range'
}

export function DateRangePicker({
  className,
  selected,
  onChange
}: DateRangePickerProps) {
  const t = useTranslations('homepage.travel.search.flights')
  const locale = useLocale()

  const local = locale === 'pt-BR' ? ptBR : enUS
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'h-[55px] w-[300px] justify-start border-[#363C41] text-left font-normal',
              !selected && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected.from, 'dd/MM/yyyy', { locale: ptBR })} -{' '}
                  {format(selected.to, 'dd/MM/yyyy', { locale: ptBR })}
                </>
              ) : (
                t('select-return')
              )
            ) : (
              t('select-range')
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selected?.from}
            selected={selected}
            onSelect={(range) => onChange(range)}
            numberOfMonths={2}
            locale={local}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
