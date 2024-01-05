import { configureStore } from "@reduxjs/toolkit";
import { eventsReducer } from "./events";

export const rdxStore = configureStore({
  reducer: { events: eventsReducer },
});
