import { EventDashboard } from "../components/EventList/EventDashboard";
import { useSelector } from "react-redux";

export const AllEvents = () => {
  const events = useSelector((state) => state["events"]);
  return <EventDashboard events={events} interval="ALL" />;
};
