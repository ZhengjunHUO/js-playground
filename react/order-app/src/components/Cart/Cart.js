import { useState, useContext } from "react";
import styles from "./Cart.module.css";
import { Modal } from "../UI/Modal";
import { OrderContext } from "../../store/order-context";
import { CartItem } from "./CartItem";
import { Checkout } from "./Checkout";

export const Cart = (props) => {
  const ctx = useContext(OrderContext);
  const [checkout, setCheckout] = useState(false);

  const total = `${ctx.total.toFixed(2)}€`;

  const addItemHandler = (item) => {
    ctx.addProd({ ...item, amount: 1 });
  };

  const delItemHandler = (id) => {
    ctx.delProd(id);
  };

  const checkoutHandler = () => {
    setCheckout(true);
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

  const actionDiv = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClickCart}>
        关闭
      </button>
      {ctx.products.length > 0 && (
        <button className={styles.button} onClick={checkoutHandler}>
          下单
        </button>
      )}
    </div>
  );

  return (
    <Modal onClick={props.onClickCart}>
      {(ctx.products.length > 0 && items) || <h2>购物车中暂无商品</h2>}
      <div className={styles.total}>
        <span>总金额</span>
        <span>{total}</span>
      </div>
      {!checkout && actionDiv}
      {checkout && <Checkout onCancel={props.onClickCart} />}
    </Modal>
  );
};
