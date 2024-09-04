import { baseURL } from "./baseURL";

export const getSearchOrder = async (param: string) => {
    
    try {
        const response = await fetch(`${baseURL}getSearchOrder.php/${param}`)
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