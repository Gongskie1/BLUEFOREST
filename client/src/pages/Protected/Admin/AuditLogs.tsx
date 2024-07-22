import  { useEffect, useState } from "react";
import axios from "axios";

interface AuditLog {
  id: number;
  status: string;
  quantity:number;
  userId?: string;
  year:number;
  month:string;
  day:string;
  time:string;
  therapyType:string;
}

const AuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await axios.get<{ data: AuditLog[] }>("http://localhost:8080/audit-log");
        setAuditLogs(response.data.data);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      }
    };

    fetchAuditLogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Quantity</th>
              <th className="border-b px-4 py-2">ProccessBy</th>
              <th className="border-b px-4 py-2">Date</th>
              <th className="border-b px-4 py-2">Time</th>
              <th className="border-b px-4 py-2">Therapy Type</th>
              
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} className="border">
                <td className="border-b px-4 py-2 border text-center">{log.id}</td>
                <td className="border-b px-4 py-2 border text-center">{log.status}</td>
                <td className="border-b px-4 py-2 border text-center">{log.quantity}</td>
                <td className="border-b px-4 py-2 border text-center">{log.userId}</td>
                <td className="border-b px-4 py-2 border text-center">{log.year+"-"+log.month+"-"+log.day}</td>
                <td className="border-b px-4 py-2 border text-center">{log.time}</td>
                <td className="border-b px-4 py-2 border text-center">{log.therapyType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
