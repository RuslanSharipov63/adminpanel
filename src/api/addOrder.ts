import { baseURL } from "./baseURL"


export const addOrder = async (dataOrder: {
    date: string,
    companyname: string,
    comments: string,
    address: string,
    dataOrder: { gaz: string, countgaz: number }[],
}) => {
    const formData = new FormData();
    formData.append('dataOrder', JSON.stringify(dataOrder));

    try {
        const response = await fetch(`${baseURL}addorder.php`, {
            method: 'POST',
            headers: {
                "Accept": "application/json", 
            },
            body: formData,
        })

        const data = await response.text();
        console.log(data);
        return data;
    } catch (error) {
        let data = 0
        return data;
    }

}