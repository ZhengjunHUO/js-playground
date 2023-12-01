import { Item } from "./components/Item";

function App() {
  const items = [
    { date: new Date(2023, 10, 8), name: "购物", sum: "121" },
    { date: new Date(2023, 10, 9), name: "超市", sum: "67" },
    { date: new Date(2023, 10, 10), name: "水电", sum: "32" },
  ];

  return (
    <div>
      <h1>Hello React!</h1>
      <div>
        {items.map((item) => (
          <Item detail={item}></Item>
        ))}
      </div>
    </div>
  );
}

export default App;
