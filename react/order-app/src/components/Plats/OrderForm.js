import { useRef, useState } from "react";
import { Input } from "../UI/Input";
import styles from "./OrderForm.module.css";

export const OrderForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const amountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const amount = amountRef.current.value;
    const nAmount = +amount;

    if (amount.trim().length === 0 || nAmount < 1 || nAmount > 5) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    props.onAddToOrder(nAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label="数量"
        ref={amountRef}
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
      {!isValid && <h2>Valid number is 1-5</h2>}
    </form>
  );
};
