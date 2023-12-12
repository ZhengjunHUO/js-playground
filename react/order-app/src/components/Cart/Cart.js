import styles from "./Cart.module.css";
import { Modal } from "../UI/Modal";

export const Cart = (props) => {
  const items = (
    <ul className={styles["cart-items"]}>
      {[{ id: "c1", name: "油条", amount: 2, price: 7 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClickCart}>
      {items}
      <div className={styles.total}>
        <span>总金额</span>
        <span>7</span>
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
