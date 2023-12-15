import { useState, useContext } from "react";
import styles from "./Cart.module.css";
import { Modal } from "../UI/Modal";
import { OrderContext } from "../../store/order-context";
import { CartItem } from "./CartItem";
import { Checkout } from "./Checkout";

export const Cart = (props) => {
  const ctx = useContext(OrderContext);
  const [checkout, setCheckout] = useState(false);
  const [done, setDone] = useState(false);

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

  const orderValidateHandler = async (coord) => {
    await fetch(
      "https://react-921c9-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          client: coord,
          cart: ctx.products,
        }),
      },
    );

    setDone(true);
    ctx.reset();
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

  const detail = (
    <>
      {(ctx.products.length > 0 && items) || <h2>购物车中暂无商品</h2>}
      <div className={styles.total}>
        <span>总金额</span>
        <span>{total}</span>
      </div>
      {!checkout && actionDiv}
      {checkout && (
        <Checkout
          onValidate={orderValidateHandler}
          onCancel={props.onClickCart}
        />
      )}
    </>
  );

  const postValid = (
    <>
      <p>订单已发送!</p>
      <div className={styles.actions}>
        <button className={styles["button"]} onClick={props.onClickCart}>
          关闭
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.onClickCart}>
      {!done && detail}
      {done && postValid}
    </Modal>
  );
};
