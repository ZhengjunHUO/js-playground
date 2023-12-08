import { useState } from "react";
import styles from "./Form.module.css";

export const Form = (props) => {
  const defaultData = {
    current: 100000,
    yearly: 10000,
    expected: 3,
    duration: 10,
  };

  const [inputData, setInputData] = useState(defaultData);

  const inputChangeHandler = (name, value) => {
    setInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmitData(inputData);
  };

  const onClickHandler = () => {
    setInputData(defaultData);
    props.onRest();
  };

  return (
    <form className={styles["form"]} onSubmit={submitHandler}>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            value={inputData.current}
            onChange={(event) =>
              inputChangeHandler("current", event.target.value)
            }
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            value={inputData.yearly}
            onChange={(event) =>
              inputChangeHandler("yearly", event.target.value)
            }
          />
        </p>
      </div>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            value={inputData.expected}
            onChange={(event) =>
              inputChangeHandler("expected", event.target.value)
            }
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={inputData.duration}
            onChange={(event) =>
              inputChangeHandler("duration", event.target.value)
            }
          />
        </p>
      </div>
      <p className={styles["actions"]}>
        <button
          type="reset"
          className={styles["buttonAlt"]}
          onClick={onClickHandler}
        >
          Reset
        </button>
        <button type="submit" className={styles["button"]}>
          Calculate
        </button>
      </p>
    </form>
  );
};
