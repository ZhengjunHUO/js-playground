import React, { useReducer } from "react";

export const OrderContext = React.createContext({
  products: [],
  total: 0,
  addProd: (prod) => {},
  delProd: (id) => {},
});

const defaultOrder = {
  products: [],
  total: 0,
};

const orderReducer = (prev, action) => {
  if (action.type === "ADD") {
    const products = prev.products.concat(action.value);
    const total = prev.total + action.value.price * action.item.amount;
    return { products: products, total: total };
  }

  if (action.type === "DEL") {
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

  const orderContext = {
    products: order.products,
    total: order.total,
    addProd: addProdHandler,
    delProd: delProdHandler,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {props.children}
    </OrderContext.Provider>
  );
};
