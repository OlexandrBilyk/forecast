import { useSelector, useDispatch } from "react-redux";
import styles from "./CitiesCard.module.scss";
import { format } from "date-fns";
import { getName } from "country-list";
import {
  delCity,
  addCity,
  changeFavorite,
} from "../../../redux/cities/CitiesSlice";
import { useLazyGetWeatherByCityQuery } from "../../../redux/weather/weatherApi";
import { ToastContainer, toast } from "react-toastify";
import WeatherIcon from "../../WeatherIcon/WeatherIcon";
import { FaRegHeart, FaHeart, FaRegTrashAlt } from "react-icons/fa";

export default function CitiesCards({ setType, setName }) {
  const cities = useSelector((state) => state.cities.cities);
  const dispatch = useDispatch();
  const [getWeather] = useLazyGetWeatherByCityQuery();

  const citiesValues =
    Object.values(cities).length > 0 ? Object.values(cities) : [];

  const sortedCities = [...citiesValues].sort((a, b) => {
    if (a.isFavorite === b.isFavorite) return 0;
    return a.isFavorite ? -1 : 1;
  });

  async function updateWeather(name) {
    const result = await getWeather(name);
    const key = name.toLowerCase();

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
          icon: result.data.weather[0].icon,
          isFavorite: cities[key].isFavorite,
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
            {sortedCities.map((el) => {
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
                      <button
                        type="button"
                        className={`${styles.btn} ${
                          el.isFavorite ? styles.favorite : ""
                        }`}
                        onClick={() => {
                          dispatch(changeFavorite({ name: el.name }));
                        }}
                      >
                        <FaRegHeart
                          className={`${styles.icon} ${styles.iconDefault}`}
                        ></FaRegHeart>
                        <FaHeart
                          className={`${styles.icon} ${styles.iconFavorite}`}
                        ></FaHeart>
                      </button>
                    </div>
                    <div className={styles.utilsRight}>
                      <button
                        type="button"
                        className={styles.btnMore}
                        onClick={() => setName(el.name)}
                      >
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
                        <FaRegTrashAlt className={styles.icon}></FaRegTrashAlt>
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
