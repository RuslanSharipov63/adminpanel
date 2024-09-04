import { baseURL } from "./baseURL"

type addPropaneType = {
    date: string,
    countСylinders: number,
    operatorName: string,
}

export const addPropane = async (dataForAddPropane: addPropaneType
) => {
    const formData = new FormData();
    formData.append('dataForAddPropane', JSON.stringify(dataForAddPropane));

    try {
        const response = await fetch(`${baseURL}/addpropane.php`, {
            method: 'POST',
            headers: { "Accept": "application/json" },
            body: formData,
        })
        if (!response.ok) {
            const data = 0;
            return data;
        }
        const data = await response.text();
        return data;
    } catch (error) {
        let data = 0
        return data;
    }

}