import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Burger.module.scss";
import { logout } from "../../redux/auth/authSlice";

export default function Burger() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <>
      <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        Menu <FaChevronDown></FaChevronDown>
      </button>
      {isOpen && (
        <div className={styles.burger}>
          <div className={styles.container}>
            <nav>
              <ul>
                <li>
                  <a href="#">Who we are</a>
                </li>
                <li>
                  <a href="#">Contacts</a>
                </li>
                <li>
                  <a href="#">Menu</a>
                </li>
              </ul>
            </nav>
            <div className={styles.profile}>
              <div className={styles.thumb}>
                <img src="#" alt="profile" className={styles.img} />
              </div>
              <button type="button" onClick={() => dispatch(logout())}>
                {user.username}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
