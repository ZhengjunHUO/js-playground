import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

export const EventsPage = () => {
  //const events = useLoaderData();

  /*
  if (data.isErr) {
    return <p>{data.payload}</p>;
  }
  */
  /*
  const data = useLoaderData();
  const events = data.events;
  return <EventsList events={events} />;
  */

  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
      <Await resolve={events}>{(ready) => <EventsList events={ready} />}</Await>
    </Suspense>
  );
};

export const loadEvents = async () => {
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
    const resData = await response.json();
    return resData.events;
    //return response;
  }
};

export const EventsLoader = () => {
  return defer({
    events: loadEvents(),
  });
};
