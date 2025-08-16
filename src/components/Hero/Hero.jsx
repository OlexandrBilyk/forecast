import { format } from "date-fns";
import { useEffect, useState, useRef } from "react";
import styles from "./Hero.module.scss";
import { useLazyGetWeatherByCityQuery } from "../../redux/weather/weatherApi";
import { addCity } from "../../redux/cities/CitiesSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function Hero() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [getWeather] = useLazyGetWeatherByCityQuery();
  const searchInput = useRef(null);

  const handleSearch = async () => {
    try {
      if (searchValue.trim() === "") return;

      const result = await getWeather(searchValue);

      if (result.data && result.data.cod !== 404) {
        dispatch(
          addCity({
            name: result.data.name,
            country: result.data.sys.country,
            temp: result.data.main.temp,
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
        toast.success(`${result.data.name} was successfully added`);
      } else {
        throw new Error("erorr");
      }
      setSearchValue("");
      searchInput.current.focus();
    } catch (err) {
      toast.error("City not found. Please check the spelling and try again.");
    }
  };
  useEffect(() => {
    const currentDate = new Date();
    setDate(format(currentDate, "MMMM yyyy EEEE, do"));
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
              ref={searchInput}
              className={styles.searchInput}
              value={searchValue}
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
    </>
  );
}
