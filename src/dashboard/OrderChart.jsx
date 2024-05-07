// OrdersChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

const OrdersChart = ({ orders }) => {
  const chartData = {
    labels: orders.map((order) => order.orderDate),
    datasets: [
      {
        label: "Order Count",
        data: orders.map((order) => order.quantity),
        backgroundColor: "#f87979",
        borderColor: "#f87979",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default OrdersChart;
