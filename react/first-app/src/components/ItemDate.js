import "./ItemDate.css";

export function ItemDate({ date }) {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });

  return (
    <div className="item-date">
      <div className="item-date__year">{year}</div>
      <div className="item-date__month">{month}</div>
      <div className="item-date__day">{day}</div>
    </div>
  );
}
