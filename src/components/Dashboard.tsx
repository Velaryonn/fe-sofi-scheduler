import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getSchedules } from "../services/apiServices";
import "./style.css";

// Format Date Helper Function
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
};

// Group by Date Helper Function
const groupByDate = (data: any[]) => {
  return data.reduce((acc: Record<string, any[]>, item) => {
    const date = formatDate(item.date);
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});
};

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<"column" | "table">("column");
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initializeSchedule = async () => {
    setLoading(true);
    try {
      const response = await getSchedules();
      const schedules = response[0]?.schedule?.schedule || [];
      setSchedule(schedules);
    } catch (error: any) {
      console.error("Error fetching schedule:", error);
      setError(error.message || "Error fetching schedule");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    initializeSchedule();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-black">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  // Group schedule by date
  const groupedSchedule = groupByDate(schedule);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button onClick={() => setViewMode(viewMode === "column" ? "table" : "column")} className="bg-gray-400 text-white px-4 py-2 rounded shadow">
          {viewMode === "column" ? "Switch to Table View" : "Switch to Column View"}
        </button>
      </div>

      <main className="flex-1 p-6">
        {viewMode === "column" ? (
          <div className="space-y-8">
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(groupedSchedule).map(([date, items]) => (
                <div className="mt-4 grid  gap-4">
                  <div key={date} className="bg-gray-100 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">{date}</h2>
                    <div className="mt-4 mb-4 gap-4">
                      {items.map((item, idx) => (
                        <div key={idx} className="bg-white p-3 rounded shadow border-l-4 border-red-500 mb-4">
                          <p className="text-sm text-red-500">{item.field}</p>
                          <h3 className="text-md font-bold">{item.thesisTitle.length > 10 ? item.thesisTitle.slice(0, 30) + "..." : item.thesisTitle}</h3>
                          <p className="text-xs">Mahasiswa: {item.studentId}</p>
                          <p className="text-xs">Room: {item.room}</p>
                          <p className="text-xs">
                            Pembimbing:
                            {item.panelAssignment?.pembimbing1Id || "N/A"}
                            {item.panelAssignment?.pembimbing2Id ? `, ${item.panelAssignment.pembimbing2Id}` : ""}
                          </p>

                          <p className="text-xs">Penguji: {item.panelAssignment?.penguji1Id || "N/A"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Field</th>
                <th className="px-4 py-2 text-left">Thesis Title</th>
                <th className="px-4 py-2 text-left">Pembimbing</th>
                <th className="px-4 py-2 text-left">Penguji</th>
                <th className="px-4 py-2 text-left">Mahasiswa</th>
                <th className="px-4 py-2 text-left">Room</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{formatDate(item.date)}</td>
                  <td className="px-4 py-2">{item.field}</td>
                  <td className="px-4 py-2">{item.thesisTitle}</td>
                  <td className="text-xs">
                    {item.panelAssignment?.pembimbing1Id || "N/A"}
                    
                    {item.panelAssignment?.pembimbing2Id ? `, ${item.panelAssignment.pembimbing2Id}` : ""}
                  </td>
                  <td className="text-xs">
                    {item.panelAssignment?.penguji1Id || "N/A"}
                    
                    {item.panelAssignment?.penguji2Id ? `, ${item.panelAssignment.penguji2Id}` : ""}
                  </td>
                  <td className="px-4 py-2">{item.studentId}</td>
                  <td className="px-4 py-2">{item.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
