import { EventDashboard } from "../components/EventList/EventDashboard";

export const RecentEvents = () => {
  return <EventDashboard interval={"Last 10 days"} />;
};
