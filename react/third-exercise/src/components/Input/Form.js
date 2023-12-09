import { useState } from "react";
import { Card } from "../UI/Card";
import { Button } from "../UI/Button";
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

    if (data.name.length === 0 || data.age === "") {
        alert("name or age can not be empty.");
        return
    }

    onClickSubmit(data);
    setData(defaultData);
  };

  return (
    <Card className={styles["input"]}>
    <form onSubmit={submitHandler}>
      <div>
        <p>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            value={data.name}
            onChange={(event) => inputHandler("name", event.target.value)}
          ></input>
        </p>
        <p>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            value={data.age}
            min="1" max="100" step="1"
            onChange={(event) => inputHandler("age", event.target.value)}
          ></input>
        </p>
      </div>
      <p>
        <Button type="submit">
          Append
        </Button>
      </p>
    </form>
    </Card>
  );
};
