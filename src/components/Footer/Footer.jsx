import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div
        className={`container ${styles.footerContainer}`}
        style={{ minWidth: 0 }}
      >
        <div className={styles.footerPages}>
          <Link to="/home">
            <svg className={styles.logo}>
              <use href="/icons/logo.svg"></use>
            </svg>
          </Link>
          <address className={styles.address}>
            <h3 className={styles.addressTitle}>Address</h3>
            <p className={styles.addressText}>Svobody str. 35 Kyiv Ukraine</p>
          </address>
        </div>
        <div className={styles.contact}>
          <h3 className={styles.contactTitle}>Contact us</h3>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferer"
                className={styles.link}
              >
                <svg className={styles.icon}>
                  <use href="/icons/instagram.svg"></use>
                </svg>
              </a>
            </li>
            <li className={styles.item}>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferer"
                className={styles.link}
              >
                <svg className={styles.icon}>
                  <use href="/icons/facebook.svg"></use>
                </svg>
              </a>
            </li>
            <li className={styles.item}>
              <a
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noopener noreferer"
                className={styles.link}
              >
                <svg className={styles.icon}>
                  <use href="/icons/whatsapp.svg"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
