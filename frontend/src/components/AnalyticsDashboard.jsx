import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import DashboardCard from "./DashboardCard";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
);

const chartOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#8a94ab",
        font: {
          family: "Poppins",
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#8a94ab",
      },
    },
    y: {
      grid: {
        color: "rgba(138, 148, 171, 0.12)",
      },
      ticks: {
        color: "#8a94ab",
      },
    },
  },
};

export default function AnalyticsDashboard({ analytics }) {
  const { availableBeds, occupiedBeds, occupancyRate, bedsByType, dailyBookings } = analytics;

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <DashboardCard title={`Occupancy ${occupancyRate}%`} accentClassName="bg-[#F7E1DD]">
        <Doughnut
          data={{
            labels: ["Occupied", "Available"],
            datasets: [
              {
                data: [occupiedBeds, availableBeds],
                backgroundColor: ["#C1121F", "#669BBC"],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#8a94ab",
                  font: { family: "Poppins" },
                },
              },
            },
          }}
        />
      </DashboardCard>

      <DashboardCard title="Bed Status Mix" accentClassName="bg-[#E6F0F6]">
        <Bar
          data={{
            labels: bedsByType.map((item) => item.type),
            datasets: [
              {
                label: "Available",
                data: bedsByType.map((item) => item.available),
                backgroundColor: "#669BBC",
                borderRadius: 12,
              },
              {
                label: "Occupied",
                data: bedsByType.map((item) => item.occupied),
                backgroundColor: "#C1121F",
                borderRadius: 12,
              },
            ],
          }}
          options={chartOptions}
        />
      </DashboardCard>

      <DashboardCard title="Daily Trend" accentClassName="bg-[#FFF5DE]">
        <Line
          data={{
            labels: dailyBookings.map((item) => item.day),
            datasets: [
              {
                label: "Bookings",
                data: dailyBookings.map((item) => item.value),
                fill: true,
                tension: 0.35,
                borderColor: "#780000",
                backgroundColor: "rgba(102, 155, 188, 0.18)",
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#780000",
                pointBorderWidth: 3,
              },
            ],
          }}
          options={chartOptions}
        />
      </DashboardCard>
    </div>
  );
}
