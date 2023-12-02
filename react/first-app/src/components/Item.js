import "./Item.css";
import { ItemDate } from "./ItemDate";

export function Item(props) {
  return (
    <div className="item">
      <ItemDate date={props.detail.date} />
      <div className="item__description">
        <h2>{props.detail.name}</h2>
        <div className="item__price">{props.detail.sum}</div>
      </div>
    </div>
  );
}
