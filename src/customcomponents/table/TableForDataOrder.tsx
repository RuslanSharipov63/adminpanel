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
import { FC } from 'react';

type ToastsForDataOrderProps = {
    dataOrder: {
        gaz: string,
        countgaz: number
    }[], 
    deleteGaz: (param: string) => void,
    cleanDataOrder: () => void,
}
const TableForDataOrder: FC<ToastsForDataOrderProps> = ({ dataOrder, deleteGaz, cleanDataOrder }) => {
   
    return (
        <div className="w-[310px] border-2 border-red-800 rounded-md  m-4 p-2">
            <Table>
                <TableCaption>Таблица заявок</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px] text-left">газ</TableHead>
                        <TableHead className="w-[50px] text-left">кол-во баллонов</TableHead>
                        <TableHead className="w-[50px] text-center cursor-pointer" onClick={cleanDataOrder}>&#10006;</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataOrder.length > 0 ? dataOrder.map((item) => (
                        <TableRow key={item.gaz + "_" + item.countgaz}>
                            <TableCell className="font-medium text-left">{item.gaz}</TableCell>
                            <TableCell className="text-left">{item.countgaz}</TableCell>
                            <TableCell className="text-center cursor-pointer" onClick={() => deleteGaz(item.gaz + "_" + item.countgaz)}>
                            &#10006;
                            </TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableForDataOrder;