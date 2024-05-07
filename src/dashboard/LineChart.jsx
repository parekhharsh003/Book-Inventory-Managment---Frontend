import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Expenses",
      data: [3, 2, 5, 7, 10, 12],
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 2,
      fill: false,
    },
  ],
};

const LineChart = () => {
  return <Line data={data} />;
};

export default LineChart;
