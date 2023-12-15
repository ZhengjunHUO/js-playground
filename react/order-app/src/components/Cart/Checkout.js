import { useRef, useState } from "react";

import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isTenChars = (value) => value.trim().length === 10;

export const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    mobile: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const mobileInputRef = useRef();
  const remarkInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredMobile = mobileInputRef.current.value;
    const enteredRemark = remarkInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredMobileIsValid = isTenChars(enteredMobile);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      mobile: enteredMobileIsValid,
    });

    const formIsValid =
      enteredNameIsValid && enteredStreetIsValid && enteredMobileIsValid;

    if (!formIsValid) {
      return;
    }

    // Send user input coordinates to Cart
    props.onValidate({
      name: enteredName,
      street: enteredStreet,
      remark: enteredRemark,
      mobile: enteredMobile,
    });
  };

  const nameControlClasses = `${styles.control} ${
    formInputsValidity.name ? "" : styles.invalid
  }`;
  const streetControlClasses = `${styles.control} ${
    formInputsValidity.street ? "" : styles.invalid
  }`;
  const mobileControlClasses = `${styles.control} ${
    formInputsValidity.mobile ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">姓名</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>请输入姓名！</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">地址</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>请输入地址！</p>}
      </div>
      <div className={mobileControlClasses}>
        <label htmlFor="mobile">手机号</label>
        <input type="text" id="mobile" ref={mobileInputRef} />
        {!formInputsValidity.mobile && <p>请输入手机号（如0123456789）</p>}
      </div>
      <div className={styles.control}>
        <label htmlFor="remark">备注</label>
        <input type="text" id="remark" ref={remarkInputRef} />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
