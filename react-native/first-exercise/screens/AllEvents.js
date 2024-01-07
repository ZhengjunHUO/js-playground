import { EventDashboard } from "../components/EventList/EventDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchEvents } from "../utils/http";
import { eventsAction } from "../store/events";

export const AllEvents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEvents();
      dispatch(eventsAction.set(events));
    };

    getEvents();
  }, []);

  const events = useSelector((state) => state["events"]);
  return <EventDashboard events={events} interval="ALL" />;
};
