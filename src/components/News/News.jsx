import { useEffect, useState } from "react";
import { useLazyGetNewsQuery } from "../../redux/news/newsApi";
import styles from "./News.module.scss";

export default function News() {
  const [getNews] = useLazyGetNewsQuery();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  const getNewsData = async function () {
    try {
      const data = await getNews({ page: page }).unwrap();

      setPage((prev) => prev + 1);

      data.articles.forEach((el) => {
        setNews((prev) => [...prev, el]);
      });

      console.log(data, news);
    } catch (err) {
      console.error("Ошибка запроса:", err);
    }
  };

  useEffect(() => {
    getNewsData();
  }, [getNews]);

  return (
    <section className={styles.news}>
      <div className="container">
        <h2 className={styles.title}>News</h2>
        <ul className={styles.list}>
          {news.map((el, i) => (
            <li className={styles.item} key={i}>
              <a href={el.url} target="_blank" rel="noopener noreferer">
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
        <button
          type="button"
          className={styles.btn}
          onClick={() => getNewsData()}
        >
          See more
        </button>
      </div>
    </section>
  );
}
