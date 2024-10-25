import React from 'react'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the datalabels plugin

// Register the required Chart.js components and the DataLabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
const ApplicantPieChart = () => {
  const data = {
    labels: ["Email", "Social Media", "Referral", "Direct"],
    datasets: [
      {
        label: "Applicants by Source",
        data: [45, 30, 15, 10], // Values for each source
        backgroundColor: ["#C9216A", "#ffe54c", "#00D363", "#658ffd"],
        hoverBackgroundColor: ["#C9216A", "#ffe54c", "#00D363", "#658ffd"],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        // Formatter to display percentages inside the pie chart
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(1) + "%"; // Calculate percentage
          return percentage; // Return the percentage
        },
        color: "#fff", // Text color
        font: {
          weight: "bold", // Make the font bold
          size: 14, // Increase the font size
        },
        align: "center", // Center the text inside the segments
        anchor: "center", // Ensure it's centered properly
      },
      legend: {
        display: true, // Display the legend
        position: "right", // Position the legend to the right
      },
    },
    maintainAspectRatio: false, // Disable aspect ratio to allow resizing
  };

  return (
    <div>
      <h2>Sources of Applicants</h2>
      <div style={{ height: "360px", width: "460px",marginBottom:"4rem" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default ApplicantPieChart

