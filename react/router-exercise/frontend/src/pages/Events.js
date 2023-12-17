import { useLoaderData, json } from "react-router-dom";
import EventsList from "../components/EventsList";

export const EventsPage = () => {
  //const events = useLoaderData();
  const data = useLoaderData();
  const events = data.events;

  /*
  if (data.isErr) {
    return <p>{data.payload}</p>;
  }
  */
  return <EventsList events={events} />;
};

export const EventsLoader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //return { isErr: true, payload: "Error occurred fetching events !" };
    /*
    throw new Response(
      JSON.stringify({ message: "Error occurred fetching events !" }),
      { status: 500 },
    );
    */
    throw json(
      { message: "Error occurred fetching events !" },
      { status: 500 },
    );
  } else {
    //const resData = await response.json();
    //return resData.events;
    return response;
  }
};
