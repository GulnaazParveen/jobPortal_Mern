import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DemographicPieChart = () => {
  const demographicData = {
    demographics: [
      { ageGroup: "18-24", percentage: 25, shortlisted: 200 },
      { ageGroup: "25-34", percentage: 35, shortlisted: 320 },
      { ageGroup: "35-44", percentage: 20, shortlisted: 150 },
      { ageGroup: "45-54", percentage: 15, shortlisted: 80 },
      { ageGroup: "55+", percentage: 5, shortlisted: 50 },
    ],
  };

  const ageGroups = demographicData.demographics.map((item) => item.ageGroup);
  const percentages = demographicData.demographics.map(
    (item) => item.percentage
  );
  const shortlisted = demographicData.demographics.map(
    (item) => item.shortlisted
  );

  const data = {
    labels: ageGroups,
    datasets: [
      {
        label: "Applicants by Age Group",
        data: percentages,
        backgroundColor: [
          "#FF5733", // Vibrant Red
          "#33FF57", // Bright Green
          "#3357FF", // Bright Blue
          "#F1C40F", // Bright Yellow
          "#8E44AD", // Purple
        ],
        hoverBackgroundColor: [
          "#FF5733", // Vibrant Red
          "#33FF57", // Bright Green
          "#3357FF", // Bright Blue
          "#F1C40F", // Bright Yellow
          "#8E44AD", // Purple
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataIndex = tooltipItem.dataIndex;
            return `Shortlisted: ${shortlisted[dataIndex]}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Demographic Breakdown of Applicants</h2>
      {/* This container adjusts the size */}
      <div style={{ height: "300px", width: "300px", margin: "0 auto" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default DemographicPieChart;
