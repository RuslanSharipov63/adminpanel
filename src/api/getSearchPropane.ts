import { baseURL } from "./baseURL";

export const getSearchPropane = async (param: string) => {
    
    try {
        const response = await fetch(`${baseURL}/getSearchPropane.php/${param}`)
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