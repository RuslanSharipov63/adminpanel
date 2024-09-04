import { baseURL } from "./baseURL";

export const getListPropane = async () => {
    try {
        const response = await fetch(`${baseURL}listpropane.php`, {
            method: 'POST',
            headers: { "Accept": "application/json" },
            cache: 'no-store'
        });
        if(!response.ok) {
            const data = 0;
            return data;
        }
         const data: any = await response.json();
         return data;    
    }
    catch (error) {
        console.log(error);
        const data = 0;
        return data;
    }
}

