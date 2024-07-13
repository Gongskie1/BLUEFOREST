import axios,{isAxiosError} from "axios";

type loginTypes = {
    username:string;
    password:string;
} 

const endPoints = "http://localhost:8080/login";

async function loginProcess(values: loginTypes) {
    try {
        const response = await axios.post(endPoints, values);
        if(!response.data.status){
            return response.data;
        }else{
            return response.data; 
        }
        
    } catch (error) {
        if(isAxiosError(error)){
            return error.response?.data;
        }else{
            throw error; 
        }
        
    }
}

export default loginProcess;