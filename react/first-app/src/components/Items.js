import { Item } from "./Item";
import "./Items.css";

export function Items({ items }) {
  return (
    <div className="items">
      {items.map((item) => (
        <Item detail={item}></Item>
      ))}
    </div>
  );
}
