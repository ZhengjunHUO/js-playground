import { Items } from "./components/Item/Items";
import { NewItem } from "./components/Input/NewItem";

function App() {
  const items = [
    { id: "i1", date: new Date(2023, 10, 8), name: "购物", sum: "121" },
    { id: "i2", date: new Date(2023, 10, 9), name: "超市", sum: "67" },
    { id: "i3", date: new Date(2023, 10, 10), name: "水电", sum: "32" },
  ];

  const addItemHandler = (data) => {
    console.log(data);
  };

  return (
    <div>
      <NewItem onAddItem={addItemHandler} />
      <Items items={items} />
    </div>
  );
}

export default App;
