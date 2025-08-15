import { format } from "date-fns";
import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import { useLazyGetWeatherByCityQuery } from "../../redux/weather/weatherApi";
import { addCity } from "../../redux/cities/CitiesSlice";
import { useDispatch } from "react-redux";

export default function Hero() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [getWeather] = useLazyGetWeatherByCityQuery();

  const handleSearch = async () => {
    if (searchValue.trim() !== "") {
      const result = await getWeather(searchValue);

      if (result.data) {
        dispatch(
          addCity({
            name: result.data.name,
            country: result.data.sys.country,
            feelsLike: result.data.main.feels_like,
            min: result.data.main.temp_min,
            max: result.data.main.temp_max,
            humidity: result.data.main.humidity,
            pressure: result.data.main.pressure,
            windSpeed: result.data.wind.speed,
            visibility: result.data.visibility,
            lastUpdated: new Date().toISOString(),
          })
        );
      }
    }
  };
  useEffect(() => {
    const currentDate = new Date();
    setDate(format(currentDate, "MMMM yyyy EEEE, do"));
  }, []);

  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.mainTitle}>Weather dashboard</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={styles.text}>
              Create your personal list of favorite cities and always be aware
              of the weather.
            </p>
          </li>
          <li className={styles.item}>
            <p className={`${styles.text} ${styles.date}`}>{date}</p>
          </li>
        </ul>

        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search location..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="button"
            className={styles.searchBtn}
            onClick={handleSearch}
          >
            <svg className={styles.searchIcon}>
              <use href="/icons/symbol-defs.svg#icon-search"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
