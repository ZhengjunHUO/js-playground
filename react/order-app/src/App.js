import { useState } from "react";

import { Header } from "./components/Layout/Header";
import { Menu } from "./components/Plats/Menu";
import { Cart } from "./components/Cart/Cart";
import { OrderProvider } from "./store/order-context";

function App() {
  const [cartVisible, setCartVisible] = useState(false);

  const flipVisibility = () => {
    setCartVisible((prev) => !prev);
  };

  return (
    <OrderProvider>
      {cartVisible && <Cart onClickCart={flipVisibility} />}
      <Header onClickCart={flipVisibility} />
      <Menu />
    </OrderProvider>
  );
}

export default App;
