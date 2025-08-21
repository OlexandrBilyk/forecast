import { useEffect, useState } from "react";
import { useLazyGetHourlyByCityQuery } from "../../../../redux/weather/weatherApi";
import WeatherIcon from "../../../WeatherIcon/WeatherIcon";
import { fromUnixTime, addSeconds, format } from "date-fns";
import styles from "./WeeklyInfo.module.scss";

export default function WeeklyInfo({ city }) {
  const [getWeather] = useLazyGetHourlyByCityQuery();
  const [grouped, setGrouped] = useState([]);

  useEffect(() => {
    if (!city) {
      setGrouped([]);
      return;
    }

    function formatForecast(list, timezone) {
      const daily = {};

      list.forEach((item) => {
        const localDate = addSeconds(fromUnixTime(item.dt), timezone);
        const dayKey = format(localDate, "EEE, MMM d");

        if (!daily[dayKey]) {
          daily[dayKey] = {
            date: dayKey,
            temps: [],
            weather: item.weather[0].description,
            icon: item.weather[0].icon,
          };
        }

        daily[dayKey].temps.push(item.main.temp);
      });

      const finalList = Object.values(daily).map((day) => {
        const avgTemp =
          day.temps.reduce((sum, t) => sum + t, 0) / day.temps.length;

        return {
          date: day.date,
          avgTemp: Math.round(avgTemp),
          weather: day.weather,
          weatherIcon: day.icon,
        };
      });

      return finalList;
    }
    const getList = async function () {
      const data = await getWeather(city).unwrap();
      const groupedData = formatForecast(data.list, data.city.timezone);

      setGrouped(groupedData);
    };

    getList();
  }, [city]);

  return (
    city && (
      <section className={styles.weekly}>
        <div className="container">
          <div className={styles.container}>
            <h3 className={styles.title}>Weekly forecast</h3>
            <ul className={styles.list}>
              {grouped.map((el, i) => (
                <li key={i} className={styles.item}>
                  <p className={styles.date}>{el.date}</p>
                  <div className={styles.temp}>
                    <div className={styles.thumb}>
                      <WeatherIcon
                        icon={el.weatherIcon}
                        className={styles.img}
                      />
                    </div>
                    <p className={styles.currentTemp}>{el.avgTemp}℃</p>
                  </div>
                  <p className={styles.weatherType}>{el.weather}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  );
}
