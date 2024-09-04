"use client"
import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
    gaz: z.string({
        required_error: "Выберите газ",
    }),
    countgaz: z.coerce.number().gte(1, { message: 'Поле обязательно для заполнения' }).lte(120, { message: 'Не больше 120 баллонов' }),
})

type DataOrderProps = {
    sendDataOrder: (data: {
        gaz: string,
        countgaz: number
    }) => void
}

const SelectGazForOrder: FC<DataOrderProps> = ({
    sendDataOrder
}) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            "gaz": "",
            "countgaz": 0,
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        sendDataOrder(data);

    }


    return (
        <div className="border-2 border-sky-600 mt-2 p-2 rounded-md">
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mt-4 mb-4">
                <FormField
                    control={form.control}
                    name="gaz"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Газ</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="выберите газ" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="углекислота">углекислота</SelectItem>
                                    <SelectItem value="кислород">кислород</SelectItem>
                                    <SelectItem value="аргон">аргон</SelectItem>
                                    <SelectItem value="коргон">коргон</SelectItem>
                                    <SelectItem value="биогон">биогон</SelectItem>
                                    <SelectItem value="азот">азот</SelectItem>
                                    <SelectItem value="пропан">пропан</SelectItem>
                                    <SelectItem value="ацетилен">ацетилен</SelectItem>

                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="countgaz"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Число баллонов</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="secondary">добавить в заявку</Button>
            </form>
        </Form>
        </div>

    );
}


export default SelectGazForOrder;