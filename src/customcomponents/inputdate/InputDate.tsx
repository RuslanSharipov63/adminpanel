"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    validationDateForInputDate
} from "@/helpers/validationDateForInputDate"

import { Label } from "@/components/ui/label"

type InputDate = {
sendDate: (param: Date | undefined) => void,
title: string
}

const InputDate: React.FC<InputDate> = ({sendDate, title}) => {
    const [date, setDate] = React.useState<Date | undefined>()
    const [messageDate, setMessageDate] = React.useState<string>('Введите дату');

    const selectedDate = (param: Date | undefined) => {
        if (param) {
            const selectedDateMillisecond = param.getTime();
            if (validationDateForInputDate(selectedDateMillisecond)) {
                setDate(param)
                sendDate(param)
                setMessageDate('Введите дату');
                return;
            } else {
                setMessageDate('Дата не валидна')
            }
        } 
    }

    return (
        <>
            <div>
                <div className="flex items-center space-x-2 mb-4 mt-4">
                    <Label htmlFor="terms">{messageDate}</Label>
                </div>
            </div>
            <Popover>

                <PopoverTrigger asChild>

                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>{title}</span>}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">

                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => selectedDate(date)}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}

export default InputDate;