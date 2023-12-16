import classes from "./Counter.module.css";
import { useSelector } from "react-redux";

const Counter = () => {
  // redux automatically create a subscription; will be notified if the counter value changed
  const sum = useSelector((state) => state.sum);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{sum}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
