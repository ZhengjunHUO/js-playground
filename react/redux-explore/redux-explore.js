const redux = require("redux");

const demoReducer = (prev = { counter: 0 }, action) => {
  if (action.type === "incre") {
    return {
      counter: prev.counter + 1
    };
  }

  if (action.type === "decre") {
    return {
      counter: prev.counter - 1
    };
  }

  return prev;
};

const demoSubscriber = () => {
  const latest = rdstore.getState();
  console.log(latest);
};

// createStore时demoReducer会执行一次
const rdstore = redux.createStore(demoReducer);

rdstore.subscribe(demoSubscriber);
// demoReducer被触发, stdout输出{ counter: 1 }
rdstore.dispatch({ type: "incre" });
// demoReducer被触发, stdout输出{ counter: 0 }
rdstore.dispatch({ type: "decre" });
