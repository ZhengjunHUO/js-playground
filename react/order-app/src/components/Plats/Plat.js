import { useContext } from "react";
import styles from "./Plat.module.css";
import { OrderForm } from "./OrderForm";
import { OrderContext } from "../../store/order-context";

export const Plat = (props) => {
  const price = `${props.plat.price.toFixed(2)}€`;
  const ctx = useContext(OrderContext);

  const addToOrderHandler = (nAmount) => {
    ctx.addProd({
      id: props.id,
      name: props.plat.name,
      amount: nAmount,
      price: props.plat.price,
    });
  };

  return (
    <li className={styles.plat}>
      <div>
        <h3>{props.plat.name}</h3>
        <div className={styles.description}>{props.plat.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <OrderForm onAddToOrder={addToOrderHandler} />
      </div>
    </li>
  );
};
