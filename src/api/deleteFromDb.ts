import { baseURL } from "./baseURL";

export const deleteFromDB = async (id: number[], queryParam: string) => {
    const formData = new FormData();
    formData.append('id', JSON.stringify(id))
    try {
        const response = await fetch(`${baseURL}${queryParam}.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData,
        })
        if (response.ok) {
            const data = await response.text();
            return data;
        }
        if (!response.ok) {
            let message = 'Произошла ошибка';
            return message;
        }

    } catch (error) {
        console.log(error);
        let message = 'Произошла ошибка';
        return message;
    }

}