import { createSlice } from "@reduxjs/toolkit";

const authInit = {
  isAuthed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInit,
  reducers: {
    login(prev) {
      prev.isAuthed = true;
    },
    logout(prev) {
      prev.isAuthed = false;
    },
  },
});

export const authActions = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
