import { useState } from "react";
import { Card } from "../UI/Card";
import { ItemsFilter } from "../Input/ItemsFilter";
import { ItemList } from "./ItemList";
import "./Items.css";

export function Items({ items }) {
  const [selectedYear, setSelectedYear] = useState("2023");

  const yearChosenHandler = (year) => {
    setSelectedYear(year);
  };

  const filteredItems = items.filter(
    (item) => item.date.getFullYear().toString() === selectedYear,
  );

  /*
  let finalContent = <p>No item found!</p>;
  if (filteredItems.length > 0) {
    finalContent = filteredItems.map((item) => (
      <Item key={item.id} detail={item}></Item>
    ));
  }
  */

  return (
    <Card className="items">
      <ItemsFilter selected={selectedYear} onYearChosen={yearChosenHandler} />
      {/* Method 1
      {filteredItems.length === 0 && <p>No item found!</p>}
      {filteredItems.length > 0 &&
        filteredItems.map((item) => <Item key={item.id} detail={item}></Item>)}
      */}
      {/* Method 2
      {filteredItems.length === 0 ? (
        <p>No item found!</p>
      ) : (
        filteredItems.map((item) => <Item key={item.id} detail={item}></Item>)
      )}
      */}
      {/* Method 3
      {finalContent}
      */}
      {/* Method 4 */}
      <ItemList filteredItems={filteredItems} />
    </Card>
  );
}
