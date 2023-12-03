import { Concept } from "./Concept";

export function Concepts({ items }) {
  return (
    <ul id="concepts">
      {items.map((item) => (
        <Concept item={item} />
      ))}
    </ul>
  );
}
