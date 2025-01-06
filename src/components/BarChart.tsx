import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getSchedules } from "../services/apiServices";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Workload {
  [id: string]: number;
}

const BarChart: React.FC = () => {
  const [workloadData, setWorkloadData] = useState<Workload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initializeSchedule = async () => {
    setLoading(true);
    try {
      const response = await getSchedules();
      console.log("Full API Response:", response);

      if (response && response.length > 0) {
        const latestData = response[response.length - 1]?.schedule.analysis.workload || null;
        console.log("Extracted Workload Data:", latestData);
        setWorkloadData(latestData);
      } else {
        console.warn("No schedules available in the response");
        setWorkloadData(null);
      }
    } catch (error: any) {
      console.error("Error fetching schedule:", error);
      setError(error.message || "Error fetching schedule");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeSchedule();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!workloadData) return <p>No data available</p>;

  const labels = Object.keys(workloadData); // ID dosen
  const dataValues = Object.values(workloadData); // Jumlah jadwal

  const data = {
    labels,
    datasets: [
      {
        label: "Jumlah Jadwal Sidang per Dosen",
        data: dataValues,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Statistik Jumlah Jadwal Sidang per Dosen",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
