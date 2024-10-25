import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components for the Bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const JobViewsBarChart = () => {
  const [chartData, setChartData] = useState(null);

  // Example job views data
  const jobViewsData = [
    { category: "Engineering", views: 300 },
    { category: "Marketing", views: 250 },
    { category: "Design", views: 150 },
    { category: "Product Management", views: 200 },
  ];

  useEffect(() => {
    // Extracting job categories (not job titles) and view counts from the dataset
    const jobCategories = jobViewsData.map((item) => item.category);
    const views = jobViewsData.map((item) => item.views);

    // Setting up the data for the chart
    setChartData({
      labels: jobCategories, // X-axis labels (job categories)
      datasets: [
        {
          label: "Number of Views",
          data: views, // Y-axis values (views count)
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderWidth: 0.5,
          barThickness: 60,
        },
      ],
    });
  }, []);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Job Views by Category",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50, // Step size for Y-axis
        },
      },
    },
  };

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <h2 className="job-view-header">Job Category Views</h2>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobViewsBarChart;
