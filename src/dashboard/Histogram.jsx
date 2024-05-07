import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["0-10", "10-20", "20-30", "30-40", "40-50"],
  datasets: [
    {
      label: "Histogram",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      categoryPercentage: 0.5,
      barPercentage: 0.5,
    },
  ],
};

const Histogram = () => {
  return (
    <Bar
      data={data}
      options={{ scales: { x: { stacked: true }, y: { stacked: true } } }}
    />
  );
};

export default Histogram;
