import { useState } from "react";

export const useInput = (validateFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  const enteredValueIsValid = validateFn(enteredValue);
  const valueInputIsInvalid = !enteredValueIsValid && enteredValueTouched;

  const valueInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlurHandler = (event) => {
    setEnteredValueTouched(true);
  };

  const initState = () => {
    setEnteredValue("");
    setEnteredValueTouched(false);
  };

  return {
    enteredValue,
    enteredValueIsValid,
    valueInputIsInvalid,
    valueInputChangeHandler,
    valueInputBlurHandler,
    initState,
  };
};
