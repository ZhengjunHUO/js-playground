import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export const EditEventPage = () => {
  const data = useRouteLoaderData("event");

  return <EventForm method="patch" event={data.event} />;
};
