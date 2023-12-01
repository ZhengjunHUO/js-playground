import "./Item.css";

export function Item(props) {
  const year = props.detail.date.getFullYear();
  const month = props.detail.date.toLocaleString("en-US", { month: "long" });
  const day = props.detail.date.toLocaleString("en-US", { day: "2-digit" });

  return (
    <div className="item">
      <div>
        <div>{year}</div>
        <div>{month}</div>
        <div>{day}</div>
      </div>
      <div className="item__description">
        <h2>{props.detail.name}</h2>
        <div className="item__price">{props.detail.sum}</div>
      </div>
    </div>
  );
}
