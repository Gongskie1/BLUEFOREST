import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, name: "John Doe", dateTime: "2024-05-10T13:00", status: "Pending" },
    { id: 2, name: "Jane Smith", dateTime: "2024-05-11T14:00", status: "Accepted" },
    { id: 3, name: "Alice Johnson", dateTime: "2024-05-12T15:00", status: "Pending" },
    { id: 4, name: "Bob Brown", dateTime: "2024-05-13T16:00", status: "Accepted" },
    { id: 5, name: "Charlie White", dateTime: "2024-05-14T17:00", status: "Pending" },
  ]);

  useEffect(() => {
    
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("/api/schedules");
      setSchedules(response.data); // Assuming data is in an array format
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleAcceptSchedule = async (scheduleId:number) => {
    try {
      // Example: Call API to accept schedule
      await axios.put(`/api/schedules/${scheduleId}/accept`);
      // Update local state or fetch schedules again
      fetchSchedules();
    } catch (error) {
      console.error("Error accepting schedule:", error);
    }
  };

  const handleDeleteSchedule = async (scheduleId:number) => {
    try {
      // Example: Call API to delete schedule
      await axios.delete(`/api/schedules/${scheduleId}`);
      // Update local state or fetch schedules again
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  // Dummy data for Recharts line chart
  const chartData = [
    { name: 'Jan', created: 20, accepted: 15 },
    { name: 'Feb', created: 25, accepted: 18 },
    { name: 'Mar', created: 30, accepted: 20 },
    { name: 'Apr', created: 35, accepted: 25 },
    { name: 'May', created: 40, accepted: 30 },
    { name: 'Jun', created: 45, accepted: 35 },
    { name: 'Jul', created: 50, accepted: 40 },
    { name: 'Aug', created: 55, accepted: 45 },
    { name: 'Sep', created: 60, accepted: 50 },
    { name: 'Oct', created: 65, accepted: 55 },
    { name: 'Nov', created: 70, accepted: 60 },
    { name: 'Dec', created: 75, accepted: 65 },
  ];

  return (
    <div className="flex w-full h-screen">
      {/* List of Schedules */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Schedule Management</h1>
        <div className="overflow-y-auto max-h-screen">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="border p-4 mb-4 rounded-md shadow">
              <p className="font-semibold">Name: {schedule.name}</p>
              <p className="text-gray-600">Schedule: {schedule.dateTime}</p>
              <p className="text-gray-600">Status: {schedule.status}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleAcceptSchedule(schedule.id)}
                  className="bg-green-500 px-4 py-2 rounded-md text-white mr-2 hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Visualization */}
      <div className="w-1/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Schedule Trends</h1>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="created" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="accepted" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
