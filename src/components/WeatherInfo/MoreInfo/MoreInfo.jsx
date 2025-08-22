import { useSelector } from "react-redux";
import styles from "./MoreInfo.module.scss";

export default function MoreInfo({ name }) {
  if (!name) return null;

  const key = name.toLowerCase();
  const city = useSelector((state) => state.cities.cities[key]);

  return (
    <section className={styles.more}>
      <div className="container">
        <ul className={styles.list}>
          <li className={styles.item}>
            <h2 className={styles.title}>Feels like</h2>
            <p className={styles.text}>{city.feelsLike}℃</p>
            <img
              src="/icons/feelsLike.svg"
              alt="feels like"
              className={styles.img}
            />
          </li>
          <li className={styles.item}>
            <div className={styles.minMax}>
              <h2 className={styles.title}>Min ℃</h2>
              <p className={styles.text}>{city.min}℃</p>
            </div>
            <div className={styles.minMax}>
              <h2 className={styles.title}>Max ℃</h2>
              <p className={styles.text}>{city.max}℃</p>
            </div>
          </li>
          <li className={styles.item}>
            <h2 className={styles.title}>Humidity</h2>
            <p className={styles.text}>{city.humidity}%</p>
            <img
              src="/icons/humidity.svg"
              alt="Humidity"
              className={styles.img}
            />
          </li>
          <li className={styles.item}>
            <h2 className={styles.title}>Pressure</h2>
            <p className={styles.text}>{city.pressure} Pa</p>
            <img
              src="/icons/pressure.svg"
              alt="Pressure"
              className={styles.img}
            />
          </li>
          <li className={styles.item}>
            <h2 className={styles.title}>Wind speed</h2>
            <p className={styles.text}>{city.windSpeed} m/s</p>
            <img
              src="/icons/windSpeed.svg"
              alt="Wind speed"
              className={styles.img}
            />
          </li>
          <li className={styles.item}>
            <h2 className={styles.title}>Visibility</h2>
            <p className={styles.text}>{city.visibility}</p>
            <img
              src="/icons/visibility.svg"
              alt="Visibility"
              className={styles.img}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
