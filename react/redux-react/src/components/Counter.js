import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { demoActions } from "../store/sum";

const Counter = () => {
  // redux automatically create a subscription; will be notified if the counter value changed
  const isVisible = useSelector((state) => state["sum"].isVisible);
  const sum = useSelector((state) => state["sum"].sum);
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    //dispatch({ type: "flip" });
    dispatch(demoActions.flip());
  };

  const incrHandler = () => {
    //dispatch({ type: "incr" });
    dispatch(demoActions.incr());
  };

  const decrHandler = () => {
    //dispatch({ type: "decr" });
    dispatch(demoActions.decr());
  };

  const addHandler = () => {
    //dispatch({ type: "add", value: 10 });
    dispatch(demoActions.add(10));
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {isVisible && <div className={classes.value}>{sum}</div>}
      <div>
        <button onClick={incrHandler}>增加</button>
        <button onClick={decrHandler}>减少</button>
        <button onClick={addHandler}>加10</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
