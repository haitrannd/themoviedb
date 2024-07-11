"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  loginStatus: boolean;
  isLoading: boolean;
}

const initialState: userState = {
  loginStatus: false,
  isLoading: false,
};

export const userReducer = createSlice({
  name: "userState",
  initialState,
  reducers: {
    update: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
});

export const { update } = userReducer.actions;

export default userReducer.reducer;
