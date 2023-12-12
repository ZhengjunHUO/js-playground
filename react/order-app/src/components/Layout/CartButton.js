import { useContext } from "react";
import Icon from "../Cart/Icon";
import styles from "./CartButton.module.css";
import { OrderContext } from "../../store/order-context";

export const CartButton = (props) => {
  const ctx = useContext(OrderContext);

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span>购物车</span>
      <span className={styles.badge}>
        {ctx.products.reduce((sum, prod) => {
          return sum + prod.amount;
        }, 0)}
      </span>
    </button>
  );
};
