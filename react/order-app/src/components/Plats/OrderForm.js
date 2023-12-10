import { Input } from "../UI/Input";
import styles from "./OrderForm.module.css";

export const OrderForm = (props) => {
  return (
    <form className={styles.form}>
      <Input
        label="数量"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>添加 +</button>
    </form>
  );
};
