import React, { useReducer } from "react";

export const OrderContext = React.createContext({
  products: [],
  total: 0,
  addProd: (prod) => {},
  delProd: (id) => {},
  reset: () => {},
});

const defaultOrder = {
  products: [],
  total: 0,
};

const orderReducer = (prev, action) => {
  if (action.type === "ADD") {
    const total = prev.total + action.value.price * action.value.amount;

    const itemIndex = prev.products.findIndex(
      (item) => item.id === action.value.id,
    );
    const target = prev.products[itemIndex];
    let items;

    if (target) {
      const newTarget = {
        ...target,
        amount: target.amount + action.value.amount,
      };

      items = [...prev.products];
      items[itemIndex] = newTarget;
    } else {
      items = prev.products.concat(action.value);
    }

    return { products: items, total: total };
  }

  if (action.type === "DEL") {
    const itemIndex = prev.products.findIndex(
      (item) => item.id === action.value,
    );
    const target = prev.products[itemIndex];
    const total = prev.total - target.price;
    let items;

    if (target.amount === 1) {
      items = prev.products.filter((item) => item.id !== action.value);
    } else {
      const newTarget = {
        ...target,
        amount: target.amount - 1,
      };

      items = [...prev.products];
      items[itemIndex] = newTarget;
    }

    return { products: items, total: total };
  }

  return defaultOrder;
};

export const OrderProvider = (props) => {
  const [order, dispatchOrder] = useReducer(orderReducer, defaultOrder);

  const addProdHandler = (prod) => {
    dispatchOrder({ type: "ADD", value: prod });
  };

  const delProdHandler = (id) => {
    dispatchOrder({ type: "DEL", value: id });
  };

  const resetHandler = () => {
    dispatchOrder({ type: "WHATEVER" });
  };

  const orderContext = {
    products: order.products,
    total: order.total,
    addProd: addProdHandler,
    delProd: delProdHandler,
    reset: resetHandler,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {props.children}
    </OrderContext.Provider>
  );
};
