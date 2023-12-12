import { useContext } from "react";
import styles from "./Cart.module.css";
import { Modal } from "../UI/Modal";
import { OrderContext } from "../../store/order-context";

export const Cart = (props) => {
  const ctx = useContext(OrderContext);

  const items = (
    <ul className={styles["cart-items"]}>
      {ctx.products.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClickCart}>
      {(ctx.products.length > 0 && items) || <h2>购物车中暂无商品</h2>}
      <div className={styles.total}>
        <span>总金额</span>
        <span>{ctx.total}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClickCart}>
          关闭
        </button>
        <button className={styles.button}>下单</button>
      </div>
    </Modal>
  );
};
