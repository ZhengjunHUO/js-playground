import styles from "./Plat.module.css";
import { OrderForm } from "./OrderForm";

export const Plat = (props) => {
  const price = `${props.plat.price.toFixed(2)}€`;

  return (
    <li className={styles.plat}>
      <div>
        <h3>{props.plat.name}</h3>
        <div className={styles.description}>{props.plat.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <OrderForm />
      </div>
    </li>
  );
};
