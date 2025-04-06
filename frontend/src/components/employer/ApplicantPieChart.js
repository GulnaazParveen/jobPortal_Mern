import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ApplicantPieChart = ({ source }) => {
  if (!source || source.length === 0) return <p>Loading...</p>;

  const labels = source.map((item) => item.name);
  const dataValues = source.map((item) => item.value);

  const data = {
    labels,
    datasets: [
      {
        label: "Applicants by Source",
        data: dataValues,
        backgroundColor: [
          "#4E79A7",
          "#F28E2B",
          "#E15759",
          "#76B7B2",
          "#59A14F",
        ],
        hoverBackgroundColor: [
          "#3A638D",
          "#D77B23",
          "#C94548",
          "#5E9F99",
          "#46833E",
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Sources of Applicants</h2>
      <div style={{ height: "360px", width: "460px" }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ApplicantPieChart;
