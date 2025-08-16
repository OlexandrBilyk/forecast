import { useSelector, useDispatch } from "react-redux";
import styles from "./CitiesCard.module.scss";
import { format } from "date-fns";
import { getName } from "country-list";

export default function CitiesCard() {
  const cities = useSelector((state) => state.cities.cities);
  const date = new Date();

  const citiesValues =
    Object.values(cities).length > 0 ? Object.values(cities) : [];

  return (
    <section>
      <div className="container">
        <ul className={styles.list}>
          {citiesValues.map((el, i) => (
            <li className={styles.item} key={el.name}>
              <div className={styles.location}>
                <h2 className={styles.loccationTitle}>{el.name}</h2>
                <h2 className={styles.loccationTitle}>{getName(el.country)}</h2>
              </div>
              <p className={styles.currentTime}>
                {date.getHours()}:{date.getMinutes()}
              </p>
              <div className={styles.filters}>
                <button type="button" className={styles.filtersBtn}>
                  Hourly forecast
                </button>
                <button type="button" className={styles.filtersBtn}>
                  Weekly forecast
                </button>
              </div>
              <div className={styles.datetime}>
                <p className={styles.date}>
                  13.10.2023 | {format(date, "EEEE")}
                </p>
              </div>
              <div className={styles.thumb}>
                <img src="/images/sun.jpg" alt="img" className={styles.image} />
              </div>
              <p className={styles.temp}>{el.temp}℃</p>
              <div className={styles.utils}>
                <div className={styles.utilsLeft}>
                  <button type="button" className={styles.btn}>
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
                  <button type="button" className={styles.btn}>
                    <svg className={styles.icon}>
                      <use href="/icons/delete.svg"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
