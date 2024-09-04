import { baseURL } from "./baseURL";

export const getListOrder = async (params: string) => {
    try {
        const response = await fetch(`${baseURL}listorder.php/${params}`, {
            method: 'POST',
            headers: { "Accept": "application/json" },
            cache: 'no-store'
        });
         const data: any = await response.json();

         return data;    
    }
    catch (error) {
        console.log(error);
        return { message: false }
    }
}

