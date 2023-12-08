export const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <li key={Math.random().toString()}>
          {item.name} has {item.age}
        </li>
      ))}
    </ul>
  );
};
