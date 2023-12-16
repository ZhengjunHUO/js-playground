//import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const defaultValue = {
  sum: 0,
  isVisible: true,
};

const demoSlice = createSlice({
  name: "sum",
  initialState: defaultValue,
  reducers: {
    incr(prev) {
      prev.sum++;
    },
    decr(prev) {
      prev.sum--;
    },
    // 默认传送过来的值为action.payload
    add(prev, action) {
      prev.sum += action.payload;
    },
    flip(prev) {
      prev.isVisible = !prev.isVisible;
    },
  },
});

/*
const demoReducer = (prev = defaultValue, action) => {
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
  reducer: demoSlice.reducer,
});

export const demoActions = demoSlice.actions;

export default rdxStore;
