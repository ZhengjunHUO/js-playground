import tupian from "../../assets/dianxin.jpeg";
import Icon from "../Cart/Icon";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <>
      <header className={styles["header"]}>
        <h1>饿了哟</h1>
        <button className={styles.button}>
          <span className={styles.icon}>
            <Icon />
          </span>
          <span>购物车</span>
          <span className={styles.badge}>1</span>
        </button>
      </header>
      <div className={styles["main-image"]}>
        <img src={tupian} alt="Something you want to eat" />
      </div>
    </>
  );
};
