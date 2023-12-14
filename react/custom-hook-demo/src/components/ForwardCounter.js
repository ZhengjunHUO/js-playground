import { useCounter } from "../hooks/use-counter";
import Card from "./Card";

export const ForwardCounter = () => {
  const counter = useCounter((prev) => prev + 1);
  return <Card>{counter}</Card>;
};
