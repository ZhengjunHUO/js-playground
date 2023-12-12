import Icon from "../Cart/Icon";
import styles from "./CartButton.module.css";

export const CartButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span>购物车</span>
      <span className={styles.badge}>1</span>
    </button>
  );
};
