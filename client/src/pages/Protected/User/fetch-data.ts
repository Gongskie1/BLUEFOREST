import axios, { isAxiosError } from "axios";

export default async function getData(){
    // const getUser = localStorage.getItem("data");
    // const userData = getUser ? JSON.parse(getUser) : null;
    const URI = `http://localhost:8080/schedule/`; 
    
    try {
        const response = await axios.get(URI);    
        if(response){
            return response.data;
        }else{
            return []
        }
    } catch (error) {
        if(isAxiosError(error)){
            return error.response?.data;
        }else{
            throw error;
        }
    }


}