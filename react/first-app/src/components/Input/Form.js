import { useState } from "react";
import "./Form.css";

export const Form = (props) => {
  const [inputDate, setInputDate] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputSum, setInputSum] = useState("");

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

  const submitHandler = (event) => {
    event.preventDefault(); // 如果没有填直接按提交不会刷新页面

    const data = {
      date: new Date(inputDate),
      name: inputName,
      sum: inputSum,
    };

    props.onSubmitItemData(data);
    setInputDate("");
    setInputName("");
    setInputSum("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-item__controls">
        <div className="new-item__control">
          <label>Name</label>
          {/*<input type="text" onChange={nameChangeHandler} />*/}
          <input
            type="text"
            value={inputName}
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
            value={inputSum}
            onChange={(event) => inputChangeHandler("sum", event.target.value)}
          />
        </div>
        <div className="new-item__control">
          <label>Date</label>
          {/*<input type="date" min="2021-01-01" step="2024-12-31" onChange={dateChangeHandler} />*/}
          <input
            type="date"
            min="2020-01-01"
            step="2025-12-31"
            value={inputDate}
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
