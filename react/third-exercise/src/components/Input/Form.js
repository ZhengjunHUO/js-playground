import { useState } from "react";
import styles from "./Form.module.css";

export const Form = ({ onClickSubmit }) => {
  const defaultData = {
    name: "",
    age: "",
  };
  const [data, setData] = useState(defaultData);

  const inputHandler = (name, value) => {
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onClickSubmit(data);
    setData(defaultData);
  };

  return (
    <form className={styles["form"]} onSubmit={submitHandler}>
      <div className={styles["input"]}>
        <p>
          <label>Name</label>
          <input
            typ="text"
            value={data.name}
            onChange={(event) => inputHandler("name", event.target.value)}
          ></input>
        </p>
        <p>
          <label>Age</label>
          <input
            type="number"
            value={data.age}
            onChange={(event) => inputHandler("age", event.target.value)}
          ></input>
        </p>
      </div>
      <p className={styles["action"]}>
        <button type="submit" className={styles["button"]}>
          Append
        </button>
      </p>
    </form>
  );
};
