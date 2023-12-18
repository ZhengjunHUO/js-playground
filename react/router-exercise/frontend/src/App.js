import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout } from "./pages/Root";
import { EventsLayout } from "./pages/EventsRoot";

import { HomePage } from "./pages/Home";
import { EventsPage, EventsLoader } from "./pages/Events";
import {
  EventDetailPage,
  DetailLoader,
  DeleteAction,
} from "./pages/EventDetail";
import { NewEventPage } from "./pages/NewEvent";
import { EditEventPage } from "./pages/EditEvent";
import { ErrorPage } from "./pages/Error";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import { UpdateAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: EventsLoader,
          },
          { path: "new", element: <NewEventPage />, action: UpdateAction },
          {
            path: ":id",
            id: "event",
            loader: DetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: DeleteAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: UpdateAction,
              },
            ],
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
