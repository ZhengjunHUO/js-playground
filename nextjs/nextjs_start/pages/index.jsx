import { useState } from 'react';

function Header({ title }) {
  return <h1>{title ? title : 'Default' }</h1>;
}

// main component of this page
export default function HomePage() {
  const names = ['Rust', 'Rusty', 'Rustacean'];
  const [likes, setLikes] = useState(0);

  function handleClick() {
    console.log("incr like count");
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="💙"/>
      <ul>
        {names.map((name) => (
          <li key={name}>
            {name}
          </li>
        ))}
      </ul>

      <button onClick={handleClick}>Like({likes})</button>
  </div>
  );
}
