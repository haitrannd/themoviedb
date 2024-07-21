"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieListing } from "../../type";
import { getMovieList } from "../../data";

export interface movieState {
  movies: {
    data: MovieListing | null;
    currentPage: number;
  };
  popularMovies: {
    data: MovieListing | null;
    currentPage: number;
  };
  submittedMovies: {
    data: MovieListing | null;
    currentPage: number;
  };
  isLoading: boolean;
  currentPage: number;
}

export const fetchMovie = createAsyncThunk(
  "fetchMovie",
  async (payload: { type: string; page: number }) => {
    const { type, page } = payload;
    const data = await getMovieList(type, page);
    return { type: type, data: data };
  }
);

export const fetchSubmittedMovie = createAsyncThunk(
  "fetchSubmittedMovie",
  async (page: number) => {
    const data = await getMovieList("popular", page);
    return data;
  }
);

const initialState: movieState = {
  movies: {
    data: null,
    currentPage: 1,
  },
  popularMovies: {
    data: null,
    currentPage: 1,
  },
  submittedMovies: {
    data: null,
    currentPage: 1,
  },
  isLoading: false,
  currentPage: 1,
};

export const movieReducer = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      if (action.payload) {
        const type = action.payload.type;
        const nextPage = action.payload.nextPage;
        if (type === "movies") {
          state.movies.currentPage = nextPage;
        } else if (type === "popularMovies") {
          state.popularMovies.currentPage = nextPage;
        }
      }
      state.currentPage = action.payload;
    },
    clearState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Now playing movies
      .addCase(fetchMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        switch (action.payload.type) {
          case "now_playing":
            if (state.movies.data) {
              state.movies.data.results = [
                ...state.movies.data.results,
                ...action.payload.data.results,
              ];
            } else {
              state.movies.data = action.payload.data;
            }
            break;
          case "popular":
            if (state.popularMovies.data) {
              state.popularMovies.data.results = [
                ...state.popularMovies.data.results,
                ...action.payload.data.results,
              ];
            } else {
              state.popularMovies.data = action.payload.data;
            }
            break;
          default:
            break;
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
