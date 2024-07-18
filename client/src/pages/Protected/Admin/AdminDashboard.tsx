import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineTooltip,
  Legend as LineLegend,
} from "recharts";

interface Schedule {
  id: number;
  firstname: string;
  lastname: string;
  schedule: string;
  status: string;
  gender: string;
}

const AdminDashboard = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [genderData, setGenderData] = useState<{ gender: string; value: number }[]>([]);
  const [acceptanceData, setAcceptanceData] = useState<{ status: string; count: number }[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get<{ data: Schedule[] }>("http://localhost:8080/schedule");
      const { data } = response.data;

      if (data.length > 0) {
        setSchedules(data);

        // Process gender data for Pie Chart
        const genderCounts = countGender(data);
        setGenderData(genderCounts);

        // Process acceptance data for Line Chart
        const acceptanceCounts = countAcceptance(data);
        setAcceptanceData(acceptanceCounts);
      } else {
        console.log("No schedules found");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  // Helper function to count gender distribution
  const countGender = (data: Schedule[]): { gender: string; value: number }[] => {
    const counts: { [key: string]: number } = {};
    data.forEach((schedule) => {
      counts[schedule.gender] = counts[schedule.gender] ? counts[schedule.gender] + 1 : 1;
    });
    return Object.keys(counts).map((gender) => ({ gender, value: counts[gender] }));
  };

  // Helper function to count acceptance status
  const countAcceptance = (data: Schedule[]): { status: string; count: number }[] => {
    const counts: { [key: string]: number } = {};
    data.forEach((schedule) => {
      counts[schedule.status] = counts[schedule.status] ? counts[schedule.status] + 1 : 1;
    });
    return Object.keys(counts).map((status) => ({ status, count: counts[status] }));
  };

  // Colors for the Pie Chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Function to accept a schedule
  const handleAcceptSchedule = async (scheduleId: number) => {
    try {
      await axios.put(`http://localhost:8080/schedule/${scheduleId}/accept`);
      fetchSchedules(); // Refresh schedules after update
    } catch (error) {
      console.error("Error accepting schedule:", error);
    }
  };

  // Function to delete a schedule
  const handleDeleteSchedule = async (scheduleId: number) => {
    try {
      await axios.delete(`http://localhost:8080/schedule/${scheduleId}`); // Adjust the URL as per your backend route
      fetchSchedules(); // Refresh schedules after delete
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here, such as clearing authentication tokens or state
    // For simplicity, we'll just reload the page to simulate logout
    localStorage.clear()
    window.location.reload();
  };

  return (
    <div className="flex w-full h-screen">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
      >
        Logout
      </button>

      {/* Schedule List */}
      <div className="w-1/2 p-6">
        <h1 className="text-2xl font-bold mb-4">Schedule List</h1>
        <div className="overflow-y-auto max-h-screen">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="border p-4 mb-4 rounded-md shadow">
              <p className="font-semibold">
                Name: {schedule.firstname} {schedule.lastname}
              </p>
              <p className="text-gray-600">Schedule: {schedule.schedule}</p>
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

      {/* Charts Section */}
      <div className="w-1/2 p-6">
        {/* Pie Chart - Gender Distribution */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Gender Distribution</h1>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="gender"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Accepted Schedules Over Time */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Accepted Schedules Over Time</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={acceptanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
              <LineTooltip />
              <LineLegend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
