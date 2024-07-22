import CreateSchedule from "./CreateSchedule";
import { useEffect, useState } from "react";
import getData from "./fetch-data";

interface ScheduleTypes {
  cellno: string;
  email: string;
  id: number;
  userId: number;
  quantity: number;
  status: string;
  therapyType: string;
  year: string;
  month: string; // month name as a string
  day: string;
  time: string;
}

interface Event {
  date: Date;
  title: string;
  time: string;
  status: "Accepted"| "Pending"
}

const monthNameToIndex: { [key: string]: number } = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const UserDashboard = () => {
  const [schedules, setSchedules] = useState<ScheduleTypes[]>([]);

  useEffect(() => {
    userData();
  }, []);

  async function userData() {
    try {
      const data = await getData();
      setSchedules(data.data);
      console.log("Fetched data", data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    console.log("Updated schedules:", schedules);
  }, [schedules]);

  // Convert the schedule data to events
  const events: Event[] = schedules.map(schedule => {
    const year = parseInt(schedule.year, 10);
    const month = monthNameToIndex[schedule.month]; // Convert month name to index
    const day = parseInt(schedule.day, 10);

    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${year}-${month + 1}-${day}`);
      return null;
    }

    return {
      date,
      title: `${schedule.therapyType} at ${schedule.time}`,
      time: schedule.time,
      status: schedule.status
    };
  }).filter(event => event !== null) as Event[];

  return (
    <div className="flex h-screen">
      <CreateSchedule events={events} />
    </div>
  );
};

export default UserDashboard;
