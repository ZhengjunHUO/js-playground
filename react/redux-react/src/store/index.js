//import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { demoSliceReducer } from "./sum";
import { authSliceReducer } from "./auth";

/*
const demoReducer = (prev = demoValue, action) => {
  if (action.type === "incr") {
    return {
      sum: prev.sum + 1,
      isVisible: prev.isVisible,
    };
  }

  if (action.type === "decr") {
    return {
      sum: prev.sum - 1,
      isVisible: prev.isVisible,
    };
  }

  if (action.type === "add") {
    return {
      sum: prev.sum + action.value,
      isVisible: prev.isVisible,
    };
  }

  if (action.type === "flip") {
    return {
      sum: prev.sum,
      isVisible: !prev.isVisible,
    };
  }

  return prev;
};
*/

//export const rdxStore = createStore(demoReducer);
const rdxStore = configureStore({
  reducer: { sum: demoSliceReducer, auth: authSliceReducer },
});

export default rdxStore;
