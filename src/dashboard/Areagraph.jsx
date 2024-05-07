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
      fill: true,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

const AreaGraph = () => {
  return <Line data={data} />;
};

export default AreaGraph;
