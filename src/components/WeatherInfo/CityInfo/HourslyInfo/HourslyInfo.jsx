import { useEffect, useState } from "react";
import { useLazyGetHourlyByCityQuery } from "../../../../redux/weather/weatherApi";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function HourslyInfo({ city }) {
  const [getWeather] = useLazyGetHourlyByCityQuery();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!city) {
      setChartData(null);
      return;
    }

    const toHourLabel = (unixDt) => {
      const d = new Date(unixDt * 1000);
      return `${d.getHours().toString().padStart(2, "0")}:00`;
    };

    const tempToC = (t) => {
      if (t == null) return null;
      return t > 200 ? +(t - 273.15).toFixed(1) : +t.toFixed(1);
    };

    const leftOffset = 6;
    const windowSize = 12;

    const fetchData = async () => {
      try {
        const data = await getWeather(city).unwrap();
        if (!data || !Array.isArray(data.list) || data.list.length === 0) {
          console.warn("No forecast data", data);
          setChartData(null);
          return;
        }

        const labelsAll = data.list.map((item) => toHourLabel(item.dt));
        const tempsAll = data.list.map((item) => {
          const rawTemp = item.main?.temp ?? item.temp ?? null;
          return tempToC(rawTemp);
        });

        const now = Date.now();
        let closestIdx = 0;
        let minDiff = Infinity;
        data.list.forEach((item, i) => {
          const diff = Math.abs(item.dt * 1000 - now);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });

        let start = Math.max(0, closestIdx - leftOffset);
        let end = start + windowSize;
        if (end > labelsAll.length) {
          end = labelsAll.length;
          start = Math.max(0, end - windowSize);
        }

        const labels = labelsAll.slice(start, end);
        const temps = tempsAll.slice(start, end);

        const chartPayload = {
          labels,
          datasets: [
            {
              data: temps,
              fill: true,
              tension: 0.3,
              pointRadius: 0,
              pointHoverRadius: 6,
              borderWidth: 2,
              borderColor: "#ffb36c",
              backgroundColor: "rgba(255,179,108,0.12)",
              spanGaps: true,
            },
          ],
        };

        setChartData(chartPayload);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setChartData(null);
      }
    };

    fetchData();
  }, [city, getWeather]);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div className="container">
      <div
        style={{
          width: "100%",
          maxWidth: "1140px",
          height: "500px",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "#e8e8e8",
        }}
      >
        <Line
          key={city}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: { top: 20, left: 20, right: 20, bottom: 20 },
            },
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: `Hourly Forecast`,
                align: "start",
                padding: { left: 10, bottom: 20 },
                color: "#374151",
                font: { size: 16, weight: "600" },
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function (context) {
                    const value = context.raw;
                    return value !== null ? `${value} °C` : "";
                  },
                },
              },
            },
            interaction: { mode: "index", intersect: false },
            scales: {
              x: { display: true, position: "top" },
              y: {
                display: true,
                ticks: {
                  callback: function (value) {
                    return `${value} °C`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
