import tupian from "../../assets/dianxin.jpeg";
import styles from "./Header.module.css";
import { CartButton } from "./CartButton.js";

export const Header = (props) => {
  return (
    <>
      <header className={styles["header"]}>
        <h1>饿了哟</h1>
        <CartButton onClick={props.onClickCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={tupian} alt="Something you want to eat" />
      </div>
    </>
  );
};
