import { useContext } from "react";
import styles from "./Cart.module.css";
import { Modal } from "../UI/Modal";
import { OrderContext } from "../../store/order-context";
import { CartItem } from "./CartItem";

export const Cart = (props) => {
  const ctx = useContext(OrderContext);

  const total = `${ctx.total.toFixed(2)}€`;

  const addItemHandler = (item) => {
    ctx.addProd({ ...item, amount: 1 });
  };

  const delItemHandler = (id) => {
    ctx.delProd(id);
  };

  const items = (
    <ul className={styles["cart-items"]}>
      {ctx.products.map((item) => (
        //<li key={item.id}>{item.name}: {item.price} * {item.amount} = {`${(item.price * item.amount).toFixed(2)}€`}</li>
        <CartItem
          key={item.id}
          item={item}
          onAdd={addItemHandler.bind(null, item)}
          onDel={delItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClickCart}>
      {(ctx.products.length > 0 && items) || <h2>购物车中暂无商品</h2>}
      <div className={styles.total}>
        <span>总金额</span>
        <span>{total}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClickCart}>
          关闭
        </button>
        {ctx.products.length > 0 && (
          <button className={styles.button}>下单</button>
        )}
      </div>
    </Modal>
  );
};
