import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const JobViewsBarChart = ({ departmentViews }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (departmentViews.length > 0) {
      const labels = departmentViews.map((d) => d._id || "Unknown");
      const data = departmentViews.map((d) => d.totalViews || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: "Views by Department",
            data,
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
            borderColor: "#2b6cb0",
            borderWidth: 1,
            barThickness: 60,
          },
        ],
      });
    }
  }, [departmentViews]);

  return (
    <div style={{ width: "600px" }}>
      <h2 className="job-view-header">Job Views by Department</h2>
      {chartData ? <Bar data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default JobViewsBarChart;
