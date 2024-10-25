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

// Register the required components for the Line chart
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ApplicantTrendsLineChart = () => {
  const [chartData, setChartData] = useState(null);

  // JSON data directly in the component
  const applicantTrendsData = [
    { date: "2024-10-01", applicants: 150 },
    { date: "2024-10-02", applicants: 175 },
    { date: "2024-10-03", applicants: 200 },
    { date: "2024-10-04", applicants: 180 },
    { date: "2024-10-05", applicants: 220 },
    { date: "2024-10-06", applicants: 210 },
    { date: "2024-10-07", applicants: 190 },
  ];

  useEffect(() => {
    // Extracting dates and applicant counts
    const dates = applicantTrendsData.map((item) => item.date);
    const applicants = applicantTrendsData.map((item) => item.applicants);

    // Set the chart data
    setChartData({
      labels: dates, // X-axis labels (dates)
      datasets: [
        {
          label: "Number of Applicants",
          data: applicants, // Y-axis values (applicant counts)
          backgroundColor: "#658ffd",
          borderColor: "#658ffd",
          borderWidth: 3,
          fill: true,
        },
      ],
    });
  }, []); // This runs once when the component mounts

  // Default options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Applicant Trends",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Step size for the Y-axis
        },
      },
    },
  };

  return (
    <div>
      <h2 className="applicant-header">Applicant Trends Over Time</h2>
      <div
        style={{
          height: "260px",
          width: "500px",
          marginTop: "5rem",
          background: "#ecf3ff",
        }}
      >
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
