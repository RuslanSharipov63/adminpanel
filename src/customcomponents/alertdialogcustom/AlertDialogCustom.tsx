"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"
import { FC, useEffect, useState } from "react";
import { deleteFromDB } from "@/api/deleteFromDb";

type AlertDialogCustomProps = {
    title: string,
    description: string,
    idForDelete: number[],
    responseServer: (response: string | undefined) => void,
    queryParam: string,
}
const AlertDialogCustom: FC<AlertDialogCustomProps> = ({ title, description, idForDelete, responseServer, queryParam }) => {

    const [checkDelete, setCheckDelete] = useState(false);

    useEffect(() => {
        const deleteById = async () => {
            const response = await deleteFromDB(idForDelete, queryParam);
            responseServer(response)
        }
        if (checkDelete) {
            deleteById();
        }
    }, [checkDelete])



    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="ml-2 bg-red-500 text-white text-right">Удалить</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={() => setCheckDelete(!checkDelete)}>Продолжить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AlertDialogCustom;