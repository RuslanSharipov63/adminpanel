"use client";
import { useState, FC } from 'react';
import InputDate from "../inputdate/InputDate";
import { parserDate } from "@/helpers/parserDate";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import AlertMessageError from "../alert/AlertMessageError";
import AlertMessageSuccess from '../alert/AlertMessageSuccess';
import { addPropane } from '@/api/addPropane';
import Typography from '../typography/Typography';

import { IListPropane } from '../../../types';

const formSchema = z.object({
    countСylinders: z.coerce.number().gte(1, { message: 'Поле обязательно для заполнения' }).lte(120, { message: 'Не больше 120 баллонов' }),
    operatorName: z.string().min(2, {
        message: "Введите имя оператора",
    }),
})

type PropaneProp = {
    changeUpload: (param: boolean) => void;
}
const Propane: FC<PropaneProp> = ({ changeUpload }) => {

    const [date, setDate] = useState<string>() /* дата которая пойдет в базу данных формат день.месяц.год */
    const [statusErrorOrder, setStatusErrorOrder] = useState<{ status: boolean, text: string }>({ status: false, text: '' });
    const [statusSuccessOrder, setStatusSuccessOrder] = useState<{ status: boolean, text: string }>({ status: false, text: '' });

    const sendDate = (param: Date | undefined) => {
        const resultDate = parserDate(param);
        setDate(resultDate);
    }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "countСylinders": 0,
            "operatorName": "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        changeUpload(false)
        setStatusErrorOrder({ status: false, text: '' });
        setStatusSuccessOrder({ status: false, text: '' });
        if (!date) {
            setStatusErrorOrder({ status: true, text: 'Введите дату' })
            return;
        }

        const dataForAddPropane = {
            date,
            countСylinders: values.countСylinders,
            operatorName: values.operatorName,
        }
        addPropane(dataForAddPropane)
            .then((data: any) => {
                return data;
            })
            .then((data) => {
                if (!data) {
                    setStatusErrorOrder({ status: true, text: 'Заявка не добавлена' });
                    return;
                } else {
                    setStatusSuccessOrder({ status: true, text: 'Заявка добавлена' })
                    changeUpload(true);
                    return;
                }
            })

    }

   
    return (
        <div className="flex flex-col sm:flex-row m-4 w-auto">
            <div className="border-2 border-slate-300 p-2 rounded-md mr-2">
                <Typography text={'Добавить пропан'} />
                {statusErrorOrder.status && <AlertMessageError text={statusErrorOrder.text} />}
                {statusSuccessOrder.status && <AlertMessageSuccess text={statusSuccessOrder.text} />}
                <InputDate sendDate={sendDate} title={'дата заправки'} />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="countСylinders"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Количество баллонов</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="operatorName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Оператор</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Создать</Button>
                    </form>
                </Form>
            </div>
          
        </div>
    );
}

export default Propane;