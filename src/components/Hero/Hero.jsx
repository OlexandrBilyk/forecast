import { format } from "date-fns";
import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";

export default function Hero() {
  const [date, setDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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
          <button type="button" className={styles.searchBtn}>
            <svg className={styles.searchIcon}>
              <use href="/icons/symbol-defs.svg#icon-search"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
