import { useState, useRef } from "react";
import { Card } from "../UI/Card";
import { Button } from "../UI/Button";
import { Error } from "../UI/Error";
import styles from "./Form.module.css";

export const Form = ({ onClickSubmit }) => {
  const [error, setError] = useState();

  const nameRef = useRef();
  const ageRef = useRef();

  /*
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
  */

  const submitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const age = ageRef.current.value;

    //if (data.name.trim().length === 0 || data.age.trim().length === 0) {
    if (name.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Illegal input",
        message: "name or age can not be empty.",
      });
      //alert("name or age can not be empty.");
      return;
    }

    //onClickSubmit({ ...data, id: Math.random().toString() });
    onClickSubmit({ name: name, age: age, id: Math.random().toString() });
    //setData(defaultData);
    nameRef.current.value = "";
    ageRef.current.value = "";
  };

  const dismissHandler = () => {
    setError(null);
  };

  return (
    <>
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
                //value={data.name}
                //onChange={(event) => inputHandler("name", event.target.value)}
                ref={nameRef}
              ></input>
            </p>
            <p>
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                min="1"
                max="100"
                step="1"
                //value={data.age}
                //onChange={(event) => inputHandler("age", event.target.value)}
                ref={ageRef}
              ></input>
            </p>
          </div>
          <p>
            <Button type="submit">Append</Button>
          </p>
        </form>
      </Card>
    </>
  );
};
