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

   // Get unique dates
   const labels = [...new Set(applicantTrend.map((item) => item.date))];

   // Get unique sources
   const sources = [...new Set(applicantTrend.map((item) => item.source))];

   // Create datasets for each source
   const datasets = sources.map((source, idx) => {
     const colorList = ["#658ffd", "#ff6384", "#4bc0c0", "#ffce56", "#9966ff"];
     const data = labels.map((label) => {
       const entry = applicantTrend.find(
         (item) => item.date === label && item.source === source
       );
       return entry ? entry.count : 0;
     });

     return {
       label: source,
       data,
       fill: false,
       tension: 0.4,
       borderColor: colorList[idx % colorList.length],
       backgroundColor: colorList[idx % colorList.length],
     };
   });

   setChartData({ labels, datasets });
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
