import { useState } from "react";
import "./Form.css";

export const Form = () => {
  const [inputName, setInputName] = useState("");
  const [inputSum, setInputSum] = useState("");
  const [inputDate, setInputDate] = useState("");

  /*
  const nameChangeHandler = (event) => {
    setInputName(event.target.value);
  };

  const sumChangeHandler = (event) => {
    setInputSum(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setInputDate(event.target.value);
  };
  */

  const inputChangeHandler = (identifier, value) => {
    if (identifier === "name") {
      setInputName(value);
    } else if (identifier === "sum") {
      setInputSum(value);
    } else {
      setInputDate(value);
    }
  };

  /*
  const [input, setInput] = useState({
    name: "",
    sum: "",
    date: "",
  });

  const nameChangeHandler = (event) => {
    setInput((prev) => {    // Get the latest snapshot of previous state
      return { ...prev, name: event.target.value };
    });
    console.log(input);
  };

  const sumChangeHandler = (event) => {
    setInput((prev) => {
      return { ...prev, sum: event.target.value };
    });
    console.log(input);
  };

  const dateChangeHandler = (event) => {
    setInput((prev) => {
      return { ...prev, date: event.target.value };
    });
    console.log(input);
  };
  */

  return (
    <form>
      <div className="new-item__controls">
        <div className="new-item__control">
          <label>Name</label>
          {/*<input type="text" onChange={nameChangeHandler} />*/}
          <input
            type="text"
            onChange={(event) => inputChangeHandler("name", event.target.value)}
          />
        </div>
        <div className="new-item__control">
          <label>Sum</label>
          {/*<input type="number" min="0.01" step="0.01" onChange={sumChangeHandler} />*/}
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={(event) => inputChangeHandler("sum", event.target.value)}
          />
        </div>
        <div className="new-item__control">
          <label>Date</label>
          {/*<input type="date" min="2020-01-01" step="2025-12-31" onChange={dateChangeHandler} />*/}
          <input
            type="date"
            min="2020-01-01"
            step="2025-12-31"
            onChange={(event) => inputChangeHandler("date", event.target.value)}
          />
        </div>
      </div>
      <div className="new-item__actions">
        <button type="submit">Add Item</button>
      </div>
    </form>
  );
};
