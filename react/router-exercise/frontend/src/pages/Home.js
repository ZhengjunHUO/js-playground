import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <p>
        See <Link to="events">events</Link>
      </p>
      <p>
        Add <Link to="events/new">new event</Link>
      </p>
    </>
  );
};
