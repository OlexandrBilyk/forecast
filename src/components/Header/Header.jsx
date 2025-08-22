import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import Burger from "../Burger/Burger";
import { setCities } from "../../redux/cities/CitiesSlice";

export default function Header() {
  const { username } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.pages}>
          <Link to="/home">
            <img src="/icons/logo.svg" alt="logo" className={styles.logo} />
          </Link>
          <nav>
            <ul className={styles.list}>
              <li className={styles.item}>
                <a href="#" className={styles.link}>
                  Who we are
                </a>
              </li>
              <li className={styles.item}>
                <a href="#" className={styles.link}>
                  Contacts
                </a>
              </li>
              <li className={styles.item}>
                <a href="#" className={styles.link}>
                  Menu
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.profile}>
          <button
            type="button"
            onClick={() => {
              dispatch(logout());
              dispatch(setCities({}));
            }}
            className={styles.profileBtn}
          >
            {username}
          </button>
          <div className={styles.profileImg}>
            <img src="/images/public-profile-img.jpg" alt="profile img" />
          </div>
        </div>
      </div>
    </header>
  );
}
