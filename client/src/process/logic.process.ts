import axios,{isAxiosError} from "axios";

type loginTypes = {
    username:string;
    password:string;
} 

const endPoints = "http://localhost:8080/login";

async function loginProcess(values: loginTypes) {
    try {
        const response = await axios.post(endPoints, values);
        if(!response.data.user){
            return {data:null,status:false};
        }else{
            return {data:response.data.user,status:true}; 
        }
        
    } catch (error) {
        if(isAxiosError(error)){
            return error.response?.data.user;
        }else{
            throw error; 
        }
        
    }
}


const createAccount = async (values: loginTypes) => {
    try {
      const response = await axios.post("http://localhost:8080/register", values);
      return response.data;  // Return the data directly
    } catch (error) {
      if (isAxiosError(error)) {
        return error.response?.data;  // Return the error response data directly
      } else {
        throw error;
      }
    }
  };
  
 

export  {loginProcess,createAccount};