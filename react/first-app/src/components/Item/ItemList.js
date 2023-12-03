import { Item } from "./Item.js";
import "./ItemList.css";

export const ItemList = ({ filteredItems }) => {
  if (filteredItems.length === 0) {
    return <h2 className="item-list__fallback">No item found!</h2>;
  }

  return (
    <ul className="item-list">
      {filteredItems.map((item) => (
        <Item key={item.id} detail={item}></Item>
      ))}
    </ul>
  );
};
