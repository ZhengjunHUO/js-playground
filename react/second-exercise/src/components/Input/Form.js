import { useState } from "react";
import styles from "./Form.module.css";

export const Form = (props) => {
  const [current, setCurrent] = useState("");
  const [yearly, setYearly] = useState("");
  const [expected, setExpected] = useState("");
  const [duration, setDuration] = useState("");

  const inputChangeHandler = (name, value) => {
    switch (name) {
      case "current":
        setCurrent(value);
        break;
      case "yearly":
        setYearly(value);
        break;
      case "expected":
        setExpected(value);
        break;
      case "duration":
        setDuration(value);
        break;
      default:
        console.log("Unsupported input name !");
        break;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      "current-savings": current,
      "yearly-contribution": yearly,
      "expected-return": expected,
      duration: duration,
    };

    props.onSubmitData(data);
  };

  const onClickHandler = () => {
    setCurrent("");
    setYearly("");
    setExpected("");
    setDuration("");

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
            value={current}
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
            value={yearly}
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
            value={expected}
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
            value={duration}
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
