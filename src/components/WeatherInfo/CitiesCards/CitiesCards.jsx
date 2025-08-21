import { useSelector, useDispatch } from "react-redux";
import styles from "./CitiesCard.module.scss";
import { format } from "date-fns";
import { getName } from "country-list";
import { delCity, addCity } from "../../../redux/cities/CitiesSlice";
import { useLazyGetWeatherByCityQuery } from "../../../redux/weather/weatherApi";
import { ToastContainer, toast } from "react-toastify";
import WeatherIcon from "../../WeatherIcon/WeatherIcon";

export default function CitiesCards({ setType }) {
  const cities = useSelector((state) => state.cities.cities);
  const dispatch = useDispatch();
  const [getWeather] = useLazyGetWeatherByCityQuery();

  const citiesValues =
    Object.values(cities).length > 0 ? Object.values(cities) : [];

  async function updateWeather(name) {
    const result = await getWeather(name);

    if (result.data) {
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
          coord: result.data.coord,
        })
      );

      toast.success("Successfully updated.");
    } else {
      toast.error("Update failed.");
    }
  }
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <section>
        <div className="container">
          <ul className={styles.list}>
            {citiesValues.map((el, i) => {
              const date = new Date(el.date);

              return (
                <li className={styles.item} key={el.name}>
                  <div className={styles.location}>
                    <h2 className={styles.loccationTitle}>{el.name}</h2>
                    <h2 className={styles.loccationTitle}>
                      {getName(el.country)}
                    </h2>
                  </div>
                  <p className={styles.currentTime}>{format(date, "HH:mm")}</p>
                  <div className={styles.filters}>
                    <button
                      type="button"
                      className={styles.filtersBtn}
                      onClick={() =>
                        setType({
                          type: "hourly",
                          city: el.name,
                        })
                      }
                    >
                      Hourly forecast
                    </button>
                    <button
                      type="button"
                      className={styles.filtersBtn}
                      onClick={() =>
                        setType({
                          type: "weekly",
                          city: el.name,
                        })
                      }
                    >
                      Weekly forecast
                    </button>
                  </div>
                  <div className={styles.datetime}>
                    <p className={styles.date}>
                      {format(date, "dd.MM.yyyy")} | {format(date, "EEEE")}
                    </p>
                  </div>
                  <div className={styles.thumb}>
                    <WeatherIcon
                      icon={el.icon}
                      className={styles.image}
                    ></WeatherIcon>
                  </div>
                  <p className={styles.temp}>{el.temp}℃</p>
                  <div className={styles.utils}>
                    <div className={styles.utilsLeft}>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnRefresh}`}
                        onClick={() => updateWeather(el.name)}
                      >
                        <svg className={styles.icon}>
                          <use href="/icons/symbol-defs.svg#icon-refresh"></use>
                        </svg>
                      </button>
                      <button type="button" className={styles.btn}>
                        <svg className={styles.icon}>
                          <use href="/icons/heart.svg"></use>
                        </svg>
                      </button>
                    </div>
                    <div className={styles.utilsRight}>
                      <button type="button" className={styles.btnMore}>
                        See more
                      </button>
                      <button
                        type="button"
                        className={styles.btn}
                        onClick={() => {
                          dispatch(delCity(el.name));
                          setType({ type: null, city: "" });
                        }}
                      >
                        <svg className={styles.icon}>
                          <use href="/icons/delete.svg"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
