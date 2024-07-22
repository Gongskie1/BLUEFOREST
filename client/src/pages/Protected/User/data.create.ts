import axios, { isAxiosError } from "axios";

interface UserScheduleType {
    email: string;
    cellno: string;
    quantity: number;
    userId: number;
    year: number;
    month: string;
    day: number;
    time: string;
    therapyType: string;
}

export default async function createSchedule(values: UserScheduleType) {
    const URI = "http://localhost:8080/schedule/";

    try {
        const response = await axios.post(URI, values);
        if(response.data.status){
            console.log("Create Success",response);
            return response.data;
        } else {
            console.log("Create Failed",response);
            return  response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error Create",error)
            return error.response?.data; // Return a string or specific error message
        }
        throw error; 
    }
}
