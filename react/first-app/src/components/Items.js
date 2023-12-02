import { Item } from "./Item";
import { Card } from "./UI/Card";
import "./Items.css";

export function Items({ items }) {
  return (
    <Card className="items">
      {items.map((item) => (
        <Item detail={item}></Item>
      ))}
    </Card>
  );
}
