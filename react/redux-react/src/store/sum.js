import { createSlice } from "@reduxjs/toolkit";

const demoValue = {
  sum: 0,
  isVisible: true,
};

const demoSlice = createSlice({
  name: "sum",
  initialState: demoValue,
  reducers: {
    incr(prev) {
      prev.sum++;
    },
    decr(prev) {
      prev.sum--;
    },
    // 默认传送过来的值为action.payload
    add(prev, action) {
      prev.sum += action.payload;
    },
    flip(prev) {
      prev.isVisible = !prev.isVisible;
    },
  },
});

export const demoActions = demoSlice.actions;
export const demoSliceReducer = demoSlice.reducer;
