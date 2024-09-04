"use client";
import { FC, FormEvent, useEffect, useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";


type CheckboxCustomComponentType = {
    id: number,
    addIdForDelete: (id: number) => void,
    deleteIdForDelete: (id: number) => void,
}

const CheckboxCustomComponent: FC<CheckboxCustomComponentType> = ({ id, addIdForDelete, deleteIdForDelete }) => {
    const [check, setCheck] = useState(false);

    const handleChange = () => {
        setCheck(!check);
    }

    useEffect(() => {
        if (check === true) {
            addIdForDelete(id)
        }
        if (check === false) {
            deleteIdForDelete(id)
        }
    }, [check])

    return (
        <div className="flex justify-end pr-4  items-center space-x-2">
            <Checkbox id={id.toString()}
                onClick={() => handleChange()}
                value={id.toString()}
                checked={check}
            />

        </div>
    )
}

export default CheckboxCustomComponent;