import axios, { isAxiosError } from "axios";

type initialValuesTypes = {
  userId: number;
  therapyType: string;
  phoneNumber: string;
  dateTime: string;
  firstName: string;
  lastName: string;
  gender: string;
};

const scheduleUri = "http://localhost:8080/schedule";

async function createSchedule(values: initialValuesTypes) {
  try {
    const response = await axios.post(scheduleUri, values);
    return response.data; // Return the entire response data
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data || { status: 'error', message: 'An error occurred' };
    } else {
      throw error;
    }
  }
}

export default createSchedule;
