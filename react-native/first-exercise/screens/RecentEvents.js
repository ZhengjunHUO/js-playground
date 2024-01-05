import { EventDashboard } from "../components/EventList/EventDashboard";
import { useSelector } from "react-redux";
import { calcPastDate } from "../utils/date";

export const RecentEvents = () => {
  const events = useSelector((state) => state["events"]);
  const today = new Date();
  const lastTen = calcPastDate(today, 10);
  const selected = events.filter(
    (item) => new Date(item.date) > lastTen && new Date(item.date) < today,
  );

  return <EventDashboard events={selected} interval={"Last 10 days"} />;
};
