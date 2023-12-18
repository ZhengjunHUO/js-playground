import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export const NewEventPage = () => {
  return <EventForm />;
};

export const CreateAction = async ({ request, params }) => {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const resp = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (resp.status === 422) {
    return resp;
  }

  if (!resp.ok) {
    throw json({ message: "Failed to submit event" }, { status: 500 });
  }

  return redirect("/events");
};
