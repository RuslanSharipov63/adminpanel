import { baseURL } from "./baseURL"


export const getFilterData = async (dataOrder:
    {
        date: string,
        companyname: string,
        comments: string
    }
) => {
    const formData = new FormData();
    formData.append('dataFilter', JSON.stringify(dataOrder));

    try {
        const response = await fetch(`${baseURL}/datafilter.php`, {
            method: 'POST',
            headers: { "Accept": "application/json" },
            body: formData,
        })
        if (!response.ok) {
            const data = { message: false }
            return data;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        let data = { message: false }
        return data;
    }

}