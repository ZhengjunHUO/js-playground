import { useState } from "react";
import "./Item.css";
import { Card } from "../UI/Card";
import { ItemDate } from "./ItemDate";

export function Item(props) {
  const [name, setName] = useState(props.detail.name);

  const clickHandler = () => {
    setName("Masked");
  };

  return (
    <Card className="item">
      <ItemDate date={props.detail.date} />
      <div className="item__description">
        <h2>{name}</h2>
        <div className="item__price">{props.detail.sum}</div>
      </div>
      <button onClick={clickHandler}>Mask</button>
    </Card>
  );
}
