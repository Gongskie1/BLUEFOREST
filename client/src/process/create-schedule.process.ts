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
    if (response.data && response.data.status) {
      return { message: response.data.message };
    } else {
      return { message: "Error" };
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message || "An error occurred" };
    } else {
      throw error;
    }
  }
}

export default createSchedule;
