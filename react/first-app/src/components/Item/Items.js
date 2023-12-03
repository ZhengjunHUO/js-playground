import { useState } from "react";
import { Item } from "./Item";
import { Card } from "../UI/Card";
import { ItemsFilter } from "../Input/ItemsFilter";
import "./Items.css";

export function Items({ items }) {
  const [selectedYear, setSelectedYear] = useState("2023");

  const yearChosenHandler = (year) => {
    setSelectedYear(year);
    console.log("In Items.js, selected year: ");
    console.log(year);
  };

  return (
    <Card className="items">
      <ItemsFilter selected={selectedYear} onYearChosen={yearChosenHandler} />
      {items.map((item) => (
        <Item key={item.id} detail={item}></Item>
      ))}
    </Card>
  );
}
