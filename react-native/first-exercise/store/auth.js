import { createSlice } from "@reduxjs/toolkit";

const initValue = {
  token: "",
  isAuthed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initValue,
  reducers: {
    authed: {
      prepare: (token) => {
        return { payload: { token } };
      },
      reducer: (state, action) => {
        return { token: action.payload.token, isAuthed: true };
      },
    },
    logout: (prev) => {
      prev.token = null;
      prev.isAuthed = false;
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
