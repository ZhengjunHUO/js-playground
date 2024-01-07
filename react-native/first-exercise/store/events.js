import { createSlice } from "@reduxjs/toolkit";

/*
const EVENTS_EXAMPLES = [
  {
    id: "e1",
    budget: 35,
    detail: "init event",
    date: new Date("2024-1-1").toISOString(),
  },
  {
    id: "e2",
    budget: 108,
    detail: "rencontre",
    date: new Date("2024-1-5").toISOString(),
  },
  {
    id: "e3",
    budget: 10,
    detail: "expo",
    date: new Date("2024-1-8").toISOString(),
  },
  {
    id: "e4",
    budget: 73,
    detail: "hiking",
    date: new Date("2024-1-14").toISOString(),
  },
  {
    id: "e5",
    budget: 153,
    detail: "annivers",
    date: new Date("2024-1-15").toISOString(),
  },
  {
    id: "e6",
    budget: 54,
    detail: "shopping",
    date: new Date("2024-1-20").toISOString(),
  },
  {
    id: "e7",
    budget: 120,
    detail: "summit",
    date: new Date("2024-1-22").toISOString(),
  },
];
*/

const eventsSlice = createSlice({
  name: "events",
  //initialState: EVENTS_EXAMPLES,
  initialState: [],
  reducers: {
    add: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (id, budget, detail, date) => {
        return { payload: { id, budget, detail, date } };
      },
    },
    delete: {
      reducer: (state, action) => {
        const targetIdx = state.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.splice(targetIdx, 1);
      },
      prepare: (id) => {
        return { payload: { id } };
      },
    },
    update: {
      reducer: (state, action) => {
        const targetIdx = state.findIndex(
          (item) => item.id === action.payload.id,
        );
        state[targetIdx] = action.payload;
      },
      prepare: (id, budget, detail, date) => {
        return { payload: { id, budget, detail, date } };
      },
    },
    set: {
      reducer: (state, action) => {
        return action.payload.events;
        //state.push(...action.payload.events);
      },
      prepare: (events) => {
        return { payload: { events: events } };
      },
    },
  },
});

export const eventsAction = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
