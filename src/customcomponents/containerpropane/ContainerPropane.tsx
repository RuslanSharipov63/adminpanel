"use client";
import { useEffect, useState } from "react";
import Propane from "@/customcomponents/propane/Propane";
import ListPropane from "@/customcomponents/listpropane/ListPropane";
import { IListPropane } from "../../../types";
import { getListPropane } from "@/api/getListPropane";
import Search from '../search/Search';


const ContainerPropane = () => {

    const [checkUploadDB, setCheckUploadDB] = useState<boolean>(false)
    const [listPropaneState, setListPropaneState] =
        useState<IListPropane[]>([]);
    const [paramSearch, setParamSearch] = useState<string>('')

    const changeUpload = (param: boolean) => {
        setCheckUploadDB(param)
    }

    useEffect(() => {
        const listPropaneArr = async () => {
            const listPropane = await getListPropane();
            setListPropaneState(listPropane);
        }
        listPropaneArr();
    }, [])

    const dataSearch = (param: string) => {
        setParamSearch(param)
    }

    return (
        <>
            <div className="flex">
                <Propane changeUpload={changeUpload} />
                <Search dataSearch={dataSearch} />
            </div>
            {listPropaneState.length === 0 ? 'Загрузка...' : <ListPropane
                listPropane={listPropaneState}
                checkUploadDB={checkUploadDB}
                paramSearch={paramSearch}
            />}
        </>
    );
}

export default ContainerPropane;