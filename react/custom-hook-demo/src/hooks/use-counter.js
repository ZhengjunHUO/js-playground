import { useState, useEffect } from "react";

//export const useCounter = (isIncr = true) => {
export const useCounter = (setCounterFn) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(setCounterFn);
    }, 1000);

    return () => clearInterval(interval);
    //}, [isIncr]);
  }, [setCounterFn]);

  return counter;
};
