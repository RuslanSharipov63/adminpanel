"use client";
import { useState, FC } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AlertMessageError from "../alert/AlertMessageError";

type InpFiltersType = {
    date: string,
    companyname: string,
    comments: string
}

type AccordionFilterProp = {
    filterRequestDB: (param: {
        date: string,
        companyname: string,
        comments: string
    }) => void
}

const AccordionFilter: FC<AccordionFilterProp> = ({
    filterRequestDB
}) => {

    const [inpFilters, setInpFilters] = useState<InpFiltersType>({
        date: '',
        companyname: '',
        comments: ''

    })

    const [validationMessage, setValidationMessage] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInpFilters({
            ...inpFilters,
            [name]: value,
        });
    }

    const sendFilter = () => {
        setValidationMessage('')
        if (!inpFilters.date && !inpFilters.companyname && !inpFilters.comments) {
            setValidationMessage('Выберите фильтр')
            return
        }

        const dateArrFormat = inpFilters.date.split('-').reverse();

        for (let el = 0; el < dateArrFormat.length; el++) {
            if (dateArrFormat[el][0] == '0') {
                dateArrFormat[el] = dateArrFormat[el].substring(1);
            }
        }

        const arrFilter = {
            ...inpFilters,
            date: dateArrFormat.join('.'),
        }
         console.log(arrFilter)

         filterRequestDB(arrFilter);  
    }


    return (
          <div className="flex flex-col">
            <Accordion type="single" collapsible className="w-[200px] border border-neutral-400 rounded-md pt-2 pb-2 pl-4 pr-4 mr-2 mb-2 sm:mb-0">
                <p>
                    фильтры
                </p>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Дата</AccordionTrigger>
                    <AccordionContent>
                        <Input type="date"
                            value={inpFilters.date}
                            onChange={handleChange}
                            name="date" />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Компания</AccordionTrigger>
                    <AccordionContent>
                        <Input type="text" value={inpFilters.companyname} onChange={handleChange}
                            name="companyname" />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Комментарии</AccordionTrigger>
                    <AccordionContent>
                        <Input type="text" value={inpFilters.comments} onChange={handleChange} name="comments" />
                    </AccordionContent>
                </AccordionItem>
                <Button className="mt-2" onClick={sendFilter}>Применить</Button>
            </Accordion>
            {validationMessage && <AlertMessageError text={validationMessage} />}
        </div>
    )
}

export default AccordionFilter;