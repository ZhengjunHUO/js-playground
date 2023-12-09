import { useState } from "react";
import { Card } from "../UI/Card";
import { Button } from "../UI/Button";
import { Error } from "../UI/Error";
import styles from "./Form.module.css";

export const Form = ({ onClickSubmit }) => {
  const defaultData = {
    name: "",
    age: "",
  };
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState();

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

    if (data.name.trim().length === 0 || data.age.trim().length === 0) {
      setError({
        title: "Illegal input",
        message: "name or age can not be empty.",
      });
      //alert("name or age can not be empty.");
      return;
    }

    onClickSubmit({ ...data, id: Math.random().toString() });
    setData(defaultData);
  };

  const dismissHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <Error
          title={error.title}
          message={error.message}
          onConfirm={dismissHandler}
        />
      )}
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
                min="1"
                max="100"
                step="1"
                onChange={(event) => inputHandler("age", event.target.value)}
              ></input>
            </p>
          </div>
          <p>
            <Button type="submit">Append</Button>
          </p>
        </form>
      </Card>
    </div>
  );
};
