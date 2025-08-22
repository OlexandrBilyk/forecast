import { useSelector, useDispatch } from "react-redux";
import styles from "./Burger.module.scss";
import { logout } from "../../redux/auth/authSlice";
import Avatar from "../Avatar/Avatar";

export default function Burger({ isOpen }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className={`${styles.burger} ${isOpen ? styles.open : ""}`}>
        <div className={styles.container}>
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
          <div className={styles.profile}>
            <div className={styles.thumb}>
              <Avatar className={styles.img}></Avatar>
            </div>
            <button
              type="button"
              onClick={() => dispatch(logout())}
              className={styles.btn}
            >
              {user.username}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
