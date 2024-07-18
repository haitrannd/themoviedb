"use client";

import { useRef } from "react";
import { useAppSelector, useAppStore } from "../lib/hooks";
import { MovieInfo } from "../lib/type";
import {
  clearState,
  fetchMovie,
  updateCurrentPage,
} from "../lib/features/movie/movieSlice";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const { data, currentPage } = useAppSelector((state) => state.movie);
  const store = useAppStore();
  const initialized = useRef(false);

  // store.dispatch(clearState());
  if (!data) {
    if (!initialized.current) {
      store.dispatch(fetchMovie(currentPage));
      initialized.current = true;
    }
  }

  let lastScrollTop = 0;
  const handleOnScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    var st = target.scrollTop;

    // For scroll down.
    if (st > lastScrollTop) {
      const reachedBottom = Math.abs(
        target.scrollHeight - (target.scrollTop + target.clientHeight)
      );
      if (reachedBottom <= 1) {
        store.dispatch(fetchMovie(currentPage + 1));
        store.dispatch(updateCurrentPage(currentPage + 1));
      }
    }

    lastScrollTop = st <= 0 ? 0 : st;
  };

  return (
    <>
      <div
        className="flex flex-wrap gap-4 h-vh-70 overflow-auto"
        onScroll={handleOnScroll}
      >
        {data &&
          data.results.map((movie: MovieInfo, index: number) => (
            <div key={`${index}_${movie.id}`} className="card">
              <MovieCard movieData={movie} />
            </div>
          ))}
      </div>
    </>
  );
}
