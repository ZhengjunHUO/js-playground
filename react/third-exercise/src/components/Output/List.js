import { Card } from "../UI/Card";
import styles from "./List.module.css";

export const List = ({ list }) => {
  return (
    <Card className={styles["list"]}>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} is {item.age}-year old.
          </li>
        ))}
      </ul>
    </Card>
  );
};
