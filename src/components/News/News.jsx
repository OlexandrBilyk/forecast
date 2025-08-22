import { useEffect, useState } from "react";
import { useLazyGetNewsQuery } from "../../redux/news/newsApi";
import styles from "./News.module.scss";

export default function News() {
  const [getNews] = useLazyGetNewsQuery();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  const getNewsData = async () => {
    setLoading(true);
    try {
      const data = await getNews({ page }).unwrap();
      setPage((prev) => prev + 1);
      setNews((prev) => [...prev, ...data.articles]);
    } catch (err) {
      console.error("Ошибка запроса:", err);
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <section className={styles.news}>
      <div className="container">
        <h2 className={styles.title}>News</h2>

        {news.length === 0 && (
          <p className={styles.noNews}>No news available</p>
        )}

        <ul className={styles.list}>
          {news.map((el) => (
            <li className={styles.item} key={el.url}>
              <a href={el.url} target="_blank" rel="noopener noreferrer">
                <div className={styles.thumb}>
                  <img
                    src={el.urlToImage}
                    alt={el.title}
                    className={styles.img}
                  />
                </div>
                <p className={styles.text}>{el.title}</p>
              </a>
            </li>
          ))}
        </ul>

        {news.length > 0 && (
          <button type="button" className={styles.btn} onClick={getNewsData}>
            See more
          </button>
        )}
      </div>
    </section>
  );
}
