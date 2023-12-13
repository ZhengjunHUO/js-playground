import { useContext, useEffect, useState } from "react";
import Icon from "../Cart/Icon";
import styles from "./CartButton.module.css";
import { OrderContext } from "../../store/order-context";

export const CartButton = (props) => {
  const ctx = useContext(OrderContext);

  const [needBump, setNeedBump] = useState(false);

  const { products } = ctx;

  const btnStyles = `${styles.button} ${needBump ? styles.bump : ""}`;
  useEffect(() => {
    if (products.length === 0) {
      return;
    }
    setNeedBump(true);

    const timer = setTimeout(() => {
      setNeedBump(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [products]);

  return (
    <button className={btnStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span>购物车</span>
      <span className={styles.badge}>
        {products.reduce((sum, prod) => {
          return sum + prod.amount;
        }, 0)}
      </span>
    </button>
  );
};
