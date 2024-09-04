"use client"
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
import { FC } from 'react';

type SearchProps = {
    dataSearch: (param: string) => void
}
const formSchema = z.object({
    searchtext: z.string().min(2, {
        message: "минимум 3 символа"
    }).max(50, {
        message: 'максимум 50 символов'
    }),
})

const Search: FC<SearchProps> = ({ dataSearch }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchtext: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        dataSearch(values.searchtext);
    }



    return (
        <div className="w-[200px] m-4 border border-neutral-400 rounded-md pt-2 pb-2 pl-4 pr-4 mb-2 h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    < FormField
                        control={form.control}
                        name="searchtext"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Поиск</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    < Button type="submit">Искать</Button >
                </form>
            </Form>
        </div>
    );
}

export default Search;