import { useCounter } from "../hooks/use-counter";
import Card from "./Card";

export const BackwardCounter = () => {
  const counter = useCounter((prev) => prev - 1);
  return <Card>{counter}</Card>;
};
