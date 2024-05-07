import React, { useEffect, useRef } from "react";
import { Pie, Line, Bar as BarChart } from "react-chartjs-2";
import Chart from "chart.js/auto";

// AreaGraph Component
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

// Dashboard Component
const pieChartData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const barChartData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const lineChartData = {
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

const histogramData = {
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

const Dashboard = () => {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const histogramRef = useRef(null);

  useEffect(() => {
    // Pie Chart
    const pieChart = new Chart(pieChartRef.current, {
      type: "pie",
      data: pieChartData,
    });

    // Bar Chart
    const barChart = new Chart(barChartRef.current, {
      type: "bar",
      data: barChartData,
      options: {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });

    // Line Chart
    const lineChart = new Chart(lineChartRef.current, {
      type: "line",
      data: lineChartData,
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });

    // Histogram
    const histogramChart = new Chart(histogramRef.current, {
      type: "bar",
      data: histogramData,
      options: {
        indexAxis: "y",
        scales: {
          x: {
            stacked: true,
          },
        },
      },
    });

    return () => {
      if (pieChart) {
        pieChart.destroy();
      }
      if (barChart) {
        barChart.destroy();
      }
      if (lineChart) {
        lineChart.destroy();
      }
      if (histogramChart) {
        histogramChart.destroy();
      }
    };
  }, []);

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Dashboard</h2>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "calc(50% - 20px)" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Pie Chart
            </h2>
            <canvas
              ref={pieChartRef}
              id="pieChart"
              width="150"
              height="150"
            ></canvas>
          </div>
          <div style={{ width: "calc(50% - 20px)" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Bar Chart
            </h2>
            <canvas
              ref={barChartRef}
              id="barChart"
              width="150"
              height="150"
            ></canvas>
          </div>
          <div style={{ width: "calc(50% - 20px)" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Line Chart
            </h2>
            <canvas
              ref={lineChartRef}
              id="lineChart"
              width="150"
              height="150"
            ></canvas>
          </div>
          <div style={{ width: "calc(50% - 20px)" }}>
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Histogram
            </h2>
            <canvas
              ref={histogramRef}
              id="histogram"
              width="150"
              height="150"
            ></canvas>
          </div>
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
              Area Graph
            </h2>
            <AreaGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
