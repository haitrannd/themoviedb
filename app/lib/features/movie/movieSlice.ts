"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieListing } from "../../type";
import { getMovieList } from "../../data";

export interface movieState {
  data: MovieListing | null;
  isLoading: boolean;
  currentPage: number;
}

export const fetchMovie = createAsyncThunk(
  "fetchMovie",
  async (page: number) => {
    const data = await getMovieList("now_playing", page);
    return data;
  }
);

const initialState: movieState = {
  data: null,
  isLoading: false,
  currentPage: 1,
};

export const movieReducer = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        if (state.data) {
          state.data.results = [
            ...state.data.results,
            ...action.payload.results,
          ];
        } else {
          state.data = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(fetchMovie.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { updateCurrentPage, clearState } = movieReducer.actions;

export default movieReducer.reducer;
