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

export default function AnalyticsDashboard({ beds, dailyBookings }) {
  const available = beds.filter((bed) => bed.status === "available").length;
  const occupied = beds.filter((bed) => bed.status === "occupied").length;
  const occupancyRate = Math.round((occupied / beds.length) * 100);

  const byType = ["ICU", "General", "Private"].map((type) => ({
    type,
    available: beds.filter((bed) => bed.type === type && bed.status === "available").length,
    occupied: beds.filter((bed) => bed.type === type && bed.status === "occupied").length,
  }));

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <DashboardCard title={`Occupancy ${occupancyRate}%`} accentClassName="bg-lavender">
        <Doughnut
          data={{
            labels: ["Occupied", "Available"],
            datasets: [
              {
                data: [occupied, available],
                backgroundColor: ["#ffd6de", "#dff6ea"],
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

      <DashboardCard title="Bed Status Mix" accentClassName="bg-mint">
        <Bar
          data={{
            labels: byType.map((item) => item.type),
            datasets: [
              {
                label: "Available",
                data: byType.map((item) => item.available),
                backgroundColor: "#dff6ea",
                borderRadius: 12,
              },
              {
                label: "Occupied",
                data: byType.map((item) => item.occupied),
                backgroundColor: "#ffd6de",
                borderRadius: 12,
              },
            ],
          }}
          options={chartOptions}
        />
      </DashboardCard>

      <DashboardCard title="Daily Trend" accentClassName="bg-blush">
        <Line
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                label: "Bookings",
                data: dailyBookings,
                fill: true,
                tension: 0.35,
                borderColor: "#9bc4ff",
                backgroundColor: "rgba(220, 236, 255, 0.5)",
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#9bc4ff",
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
