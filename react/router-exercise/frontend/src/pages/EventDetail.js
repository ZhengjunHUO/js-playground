import { json, useRouteLoaderData, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

export const EventDetailPage = () => {
  const data = useRouteLoaderData("event");

  return <EventItem event={data.event} />;
};

export const DetailLoader = async ({ request, params }) => {
  const id = params.id;

  const resp = await fetch("http://localhost:8080/events/" + id);
  if (!resp.ok) {
    throw json(
      { message: "Failed to fetch detail for event." },
      { status: 500 },
    );
  } else {
    return resp;
  }
};

export async function DeleteAction({ params, request }) {
  const id = params.id;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      },
    );
  }
  return redirect("/events");
}
