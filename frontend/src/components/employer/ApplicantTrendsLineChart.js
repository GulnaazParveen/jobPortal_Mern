import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ApplicantTrendsLineChart = ({ applicantTrend, source }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!applicantTrend || applicantTrend.length === 0) return;

   const labels = applicantTrend.map((item) => item.name); 

   const dataValues = applicantTrend.map((item) => item.count);

    setChartData({
      labels,
      datasets: [
        {
          label: "Applicants per Week",
          data: dataValues,
          backgroundColor: "#658ffd",
          borderColor: "#658ffd",
          borderWidth: 2,
          fill: false,
          tension: 0.4,
        },
      ],
    });
  }, [applicantTrend]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className="applicant-header">Applicant Trends</h2>
      <div style={{ height: "300px", width: "500px", background: "#f9f9f9" }}>
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ApplicantTrendsLineChart;
