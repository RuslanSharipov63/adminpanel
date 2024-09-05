"use client";
import { useState, FC, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CheckboxCustomComponent from "../checkbox/CheckboxCustomComponent";
import AlertDialogCustom from "../alertdialogcustom/AlertDialogCustom";
import { IlistOrder } from "../../../types";
import AlertMessageSuccess from "../alert/AlertMessageSuccess";
import AlertMessageError from "../alert/AlertMessageError";
import { getListOrder } from "@/api/getListOrder";
import AccordionFilter from "../accordionfilter/AccordionFilter";
import { getFilterData } from "@/api/getFilterData";
import Search from "@/customcomponents/search/Search";
import { getSearchOrder } from "@/api/getSearchOrder";
import PaginationComponent from "../pagination/PaginationComponent";


type listOrderType = {
    listOrderArr: IlistOrder[],
};

const ListOrder: FC<listOrderType> = ({ listOrderArr }) => {

    const [idForDelete, setIdForDelete] = useState<number[]>([]);
    const [observerIdForDelete, setOserverIdForDelete] = useState(false);
    const [listOrder, setListOrder] = useState<IlistOrder[]>([])
    let [responseDelete, setResponseDelete] = useState<string>('');

    useEffect(() => {
        if (listOrderArr.length > 0) {
            setListOrder(listOrderArr);
        }
    }, [listOrderArr.length])


    const deleteIdForDelete = (id: number) => {
        let idArr = [...idForDelete];
        setIdForDelete(idArr.filter(el => el != id));
        setOserverIdForDelete(!observerIdForDelete);
    }

    const addIdForDelete = (id: number) => {
        let idArr = [...idForDelete, id];
        setIdForDelete(idArr);
        setOserverIdForDelete(!observerIdForDelete);
    }

    useEffect(() => {
        let idArr = [...idForDelete];
        setIdForDelete(idArr);
    }, [observerIdForDelete])

    const responseServer = (response: string | undefined) => {
        if (response) {
            setResponseDelete(response);
        }

        setTimeout(() => {
            setResponseDelete('');
        }, 2000);
    }

    useEffect(() => {
        const getListOrderAfterDelete = async () => {
            const listOrderAfterDelete = await getListOrder('1');
            await listOrderAfterDelete.map((el: any) => {
                let b = JSON.parse(el.dataorder);
                el.dataorder = b;

            });
            await setListOrder(listOrderAfterDelete);
        }

        if (responseDelete != '') {
            getListOrderAfterDelete();
        }
    }, [responseDelete])


    const filterRequestDB = (param:
        {
            date: string,
            companyname: string,
            comments: string
        }
    ) => {
        setResponseDelete('');
        getFilterData(param)
            .then((data) => {
                data.map((el: any) => {
                    let b = JSON.parse(el.dataorder);
                    el.dataorder = b;

                });
                setListOrder(data);
                return;
            })

    }
    const dateSearch = (param: string) => {
        setResponseDelete('');
        getSearchOrder(param)
            .then((data: any) => {
                if ("message" in data) {
                    responseServer('произошла ошибка');
                    return;
                }
                data.map((el: any) => {
                    let b = JSON.parse(el.dataorder);
                    el.dataorder = b;

                });
                setListOrder(data)
                return;
            })
    }


    return (
        <div className="m-2">
            <div className="flex flex-col sm:flex-row">
                <AccordionFilter filterRequestDB={filterRequestDB} />
                <Search dataSearch={dateSearch} />

            </div>
            {responseDelete === "Удаление прошло успешно" && <AlertMessageSuccess text={responseDelete} />}
            {responseDelete === 'Произошла ошибка' && <AlertMessageError text={responseDelete} />}
            {listOrder.length === 0 && <AlertMessageError text={'список заявок пуст'} />}
            <PaginationComponent paginationLength={listOrder.length} />
            <Table>
                <TableCaption>Список заявок</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Компания</TableHead>
                        <TableHead>Дата поставки</TableHead>
                        <TableHead>Газ</TableHead>
                        <TableHead className="text-right">Адрес</TableHead>
                        <TableHead className="text-right">Комментарии</TableHead>
                        <TableHead className="text-right">
                            <AlertDialogCustom title={'Удалить?'} description={"Удаление произойдет навсегда"}
                                idForDelete={idForDelete}
                                responseServer={responseServer}
                                queryParam={'deleteorder'}
                            />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listOrder.map((el: IlistOrder) => (
                        <TableRow key={el.id}>
                            <TableCell className="font-medium">{el.companyname}</TableCell>
                            <TableCell>{el.date}</TableCell>
                            <TableCell>{el.dataorder.map(item => {
                                return <p key={item.gaz + item.countgaz}>{item.gaz} - {item.countgaz}</p>
                            })}</TableCell>
                            <TableCell
                                className="text-right">
                                {el.address}
                            </TableCell>
                            <TableCell
                                className="text-right">
                                {el.comments}
                            </TableCell>
                            <TableCell className="text-right">                               <CheckboxCustomComponent
                                id={el.id}
                                addIdForDelete={addIdForDelete}
                                deleteIdForDelete={deleteIdForDelete}
                            />

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ListOrder;