import "./Item.css";
import { Card } from "./UI/Card";
import { ItemDate } from "./ItemDate";

export function Item(props) {
  return (
    <Card className="item">
      <ItemDate date={props.detail.date} />
      <div className="item__description">
        <h2>{props.detail.name}</h2>
        <div className="item__price">{props.detail.sum}</div>
      </div>
    </Card>
  );
}
