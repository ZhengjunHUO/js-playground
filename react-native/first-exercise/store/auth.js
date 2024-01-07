import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        AsyncStorage.setItem("token", action.payload.token);
        return { token: action.payload.token, isAuthed: true };
      },
    },
    logout: (prev) => {
      AsyncStorage.removeItem("token");
      prev.token = null;
      prev.isAuthed = false;
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
