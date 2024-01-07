import { EventDashboard } from "../components/EventList/EventDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchEvents } from "../utils/http";
import { eventsAction } from "../store/events";
import { Loading } from "../components/UI/Loading";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export const AllEvents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const authInfo = useSelector((state) => state["auth"]);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const events = await fetchEvents(authInfo.token);
        dispatch(eventsAction.set(events));
      } catch (e) {
        setError("Error occurred during fetching !");
      }
      setIsLoading(false);
    };

    getEvents();
  }, []);

  const events = useSelector((state) => state["events"]);

  if (isLoading) {
    return <Loading />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  return <EventDashboard events={events} interval="ALL" />;
};
