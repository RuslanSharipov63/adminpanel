"use client"
import { FC, useState, useEffect } from 'react';
import { IListPropane } from '../../../types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AlertDialogCustom from '../alertdialogcustom/AlertDialogCustom';
import CheckboxCustomComponent from '../checkbox/CheckboxCustomComponent';
import AlertMessageError from '../alert/AlertMessageError';
import AlertMessageSuccess from '../alert/AlertMessageSuccess';
import { getListPropane } from '@/api/getListPropane';
import { getSearchPropane } from "@/api/getSearchPropane";

type listPropaneType = {
    listPropane: IListPropane[],
    checkUploadDB: boolean,
    paramSearch: string

};

const ListPropane: FC<listPropaneType> = ({
    listPropane, checkUploadDB, paramSearch
}) => {
    const [listPropaneState, setListPropaneState] = useState<IListPropane[]>([]);
    let [responseDelete, setResponseDelete] = useState<string>('');
    const [idForDelete, setIdForDelete] = useState<number[]>([]);
    const [observerIdForDelete, setOserverIdForDelete] = useState(false);


    useEffect(() => {
        setResponseDelete('')
        if (listPropane?.length > 0) {
            let newArr = [...listPropane];
            setListPropaneState(newArr);
        }
    }, [listPropane?.length])

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
        setResponseDelete('');
        const getListPropaneAfterDelete = async () => {
            const listPropaneAfterDelete = await getListPropane();
            await setListPropaneState(listPropaneAfterDelete);

        }

        if (responseDelete != '' || checkUploadDB) {
            getListPropaneAfterDelete();

        }
    }, [responseDelete, checkUploadDB])


    const listPropaneAfterSearch = () => {
        getSearchPropane(paramSearch)
            .then((data: any) => {
                if ("message" in data) {
                    alert('ошибка')
                    return;
                }
                let timeArr = [...data]
                setListPropaneState(timeArr);
                return;
            })
    }

    useEffect(() => {
        if(paramSearch) {
            listPropaneAfterSearch();
        }
        
    }, [paramSearch])

    return (
        <>
            {responseDelete === "Удаление прошло успешно" && <AlertMessageSuccess text={responseDelete} />}
            {responseDelete === 'Произошла ошибка' && <AlertMessageError text={responseDelete} />}


            <Table>
                <TableCaption>Список заправок пропана</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Дата</TableHead>
                        <TableHead className="text-right">Количество баллонов</TableHead>
                        <TableHead className="text-right">Оператор</TableHead>
                        <TableHead className="text-right">
                            <AlertDialogCustom title={'Удалить?'} description={"Удаление произойдет навсегда"}
                                idForDelete={idForDelete}
                                responseServer={responseServer}
                                queryParam={'deletepropane'}
                            />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listPropaneState.map((el: IListPropane) => (
                        <TableRow key={el.id}>
                            <TableCell>{el.date}</TableCell>
                            <TableCell className="text-right">{el.countСylinders}</TableCell>
                            <TableCell
                                className="text-right">
                                {el.operatorName}
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
        </>
    );
}

export default ListPropane;