export const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <li key={Math.random().toString()}>
          {item.name} is {item.age}-year old.
        </li>
      ))}
    </ul>
  );
};
