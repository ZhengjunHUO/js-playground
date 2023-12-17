import { Link } from "react-router-dom";

const EVENTS = [
  { id: "ev1", message: "Message 1" },
  { id: "ev2", message: "Message 2" },
  { id: "ev3", message: "Message 3" },
];

export const EventsPage = () => {
  return (
    <>
      <h1>Events</h1>
      <ul>
        {EVENTS.map((evt) => (
          <li key={evt.id}>
            <Link to={evt.id}>{evt.message}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
