import { createStore } from "redux";

const demoReducer = (prev = { sum: 0 }, action) => {
  if (action.type === "incr") {
    return {
      sum: prev.sum + 1,
    };
  }

  if (action.type === "decr") {
    return {
      sum: prev.sum - 1,
    };
  }

  return prev;
};

/*
const demoSubscriber = () => {
  const current = rdxStore.getState();
  console.log(current);
};
*/

export const rdxStore = createStore(demoReducer);
//rdxStore.subscribe(demoSubscriber);
