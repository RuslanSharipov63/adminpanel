"use client"
import * as React from "react"
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
import { Input } from "@/components/ui/input"
import InputDate from "../inputdate/InputDate"
import SelectGazForOrder from "../selectgazfororder/SelectGazForOrder"
import TableForDataOrder from "../table/TableForDataOrder";
import { Textarea } from "@/components/ui/textarea";
import AlertMessageError from "../alert/AlertMessageError"
import { addOrder } from "@/api/addOrder"
import AlertMessageSuccess from "../alert/AlertMessageSuccess";
import { parserDate } from "@/helpers/parserDate"
import Typography from '../typography/Typography';

const formSchema = z.object({
  companyname: z.string().min(3, {
    message: "Введите название компании",
  }),
  address: z.string().min(5, {
    message: "Введите адрес доставки",
  }),
  comments: z.string().min(0),
})



const Order = () => {

  const [date, setDate] = React.useState<string>() /* дата которая пойдет в базу данных формат день.месяц.год */
  const [dataOrder, setDataOrder] = React.useState<{ gaz: string, countgaz: number }[]>([]);
  const [statusErrorOrder, setStatusErrorOrder] = React.useState<{ status: boolean, text: string }>({ status: false, text: '' });

  const [statusSuccessOrder, setStatusSuccessOrder] = React.useState<{ status: boolean, text: string }>({ status: false, text: '' });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "companyname": "",
      "comments": "",
      "address": "",
    }
  })

  const sendDate = (param: Date | undefined) => {
    const resultDate = parserDate(param);
    setDate(resultDate);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setStatusErrorOrder({ status: false, text: '' });
    setStatusSuccessOrder({ status: false, text: '' });
    if (!date) {
      setStatusErrorOrder({ status: true, text: 'Введите дату' })
      return;
    }
    if (dataOrder.length === 0) {
      setStatusErrorOrder({ status: true, text: 'Введите количество газов' })
      return;
    }
    setStatusErrorOrder({ status: false, text: '' })
    let arrOrder = {
      date,
      companyname: values.companyname,
      comments: values.comments,
      address: values.address,
      dataOrder: [...dataOrder]
    }

    addOrder(arrOrder)
      .then((data: any) => {
        return data;
      })
      .then((data) => {
        if (!data) {
          setStatusErrorOrder({ status: true, text: 'Заявка не добавлена' });
          return;
        } else {
          setStatusSuccessOrder({ status: true, text: 'Заявка добавлена' })
          return;
        }
      })
  }

  const sendDataOrder = (data: {
    gaz: string, countgaz: number
  }) => {
    setStatusErrorOrder({ status: false, text: '' })
    let checkGaz = true;
    dataOrder.forEach(element => {
      if (element.gaz === data.gaz) {
        setStatusErrorOrder({ status: true, text: 'данный газ уже есть в заявке' })
        checkGaz = false;
      }
    });
    if (data.gaz === '') {
      setStatusErrorOrder({ status: true, text: 'выберите газ' })
      checkGaz = false;
    }
    if (!checkGaz) return;

    let newObject = [{ gaz: data.gaz, countgaz: data.countgaz }, ...dataOrder]
    setDataOrder(newObject);
  }
  const deleteGaz = (param: string) => {
    let newDataOrder = dataOrder.filter((item) => {
      let newStr = item.gaz + '_' + item.countgaz;
      return newStr != param;

    })
    setDataOrder(newDataOrder);
  }
  const cleanDataOrder = () => {
    setDataOrder([])
  }
  return (
    <>
      
      <div className="flex flex-col sm:flex-row m-4 w-auto">

        <div className="border-2 border-slate-300 p-2 rounded-md">
          <Typography text={'Добавить заявку'} />
          {statusErrorOrder.status && <AlertMessageError text={statusErrorOrder.text} />}
          {statusSuccessOrder.status && <AlertMessageSuccess text={statusSuccessOrder.text} />}
          <InputDate sendDate={sendDate} title={'Дата заявки'} />
          <SelectGazForOrder sendDataOrder={sendDataOrder} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="companyname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>компания</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>адрес</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Комменатрий</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Создать</Button>
            </form>
          </Form>
        </div>
        <div>
          {dataOrder.length > 0 ? <TableForDataOrder dataOrder={dataOrder} deleteGaz={deleteGaz} cleanDataOrder={cleanDataOrder} /> : null}
        </div>
      </div>
    </>
  );
}
export default Order;