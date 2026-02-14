'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  label: 'start' | 'end'
  className?: string
}

export function DatePicker({ date, setDate, label, className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const months = Array.from({ length: 12 }).map((_, i) => capitalize(format(new Date(2020, i, 1), 'MMMM', { locale: ptBR })))

  return (
    <Field>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn('justify-start font-normal', date ? 'text-foreground' : 'text-muted-foreground', className)}
          >
            {date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : label === 'start' ? 'Data de início' : 'Data de término'}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            locale={ptBR}
            captionLayout="dropdown"
            startMonth={new Date(2000, 0)}
            endMonth={new Date(2050, 11)}
            formatters={{
              formatMonthDropdown: month => months[month.getMonth()],
              formatCaption: date => format(date, 'MMMM yyyy', { locale: ptBR }),
            }}
            onSelect={date => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
