"use client";

import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppStore } from "../lib/hooks";
import { MovieInfo, MovieListing } from "../lib/type";
import {
  clearState,
  fetchMovie,
  updateCurrentPage,
} from "../lib/features/movie/movieSlice";
import MovieCard from "./MovieCard";

type Props = {
  type: string;
};

export default function MovieList(props: Props) {
  const { type } = props;
  const { movies, popularMovies } = useAppSelector((state) => state.movie);
  const [moviesData, setMoviesData] = useState<{
    data: MovieListing | null;
    currentPage: number;
  }>({
    data: null,
    currentPage: 1,
  });

  useEffect(() => {
    if (type === "now_playing") {
      setMoviesData(movies);
    } else if (type === "popular") {
      setMoviesData(popularMovies);
    }
  }, [movies, popularMovies, type]);

  const store = useAppStore();
  const initialized = useRef(false);

  useEffect(() => {
    // store.dispatch(clearState());
    if (!moviesData.data) {
      if (!initialized.current) {
        store.dispatch(
          fetchMovie({ type: type, page: moviesData.currentPage })
        );
        initialized.current = true;
      }
    }
  }, []);

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
        store.dispatch(
          fetchMovie({ type: type, page: moviesData.currentPage + 1 })
        );
        store.dispatch(
          updateCurrentPage({
            type: type,
            currentPage: moviesData.currentPage + 1,
          })
        );
      }
    }

    lastScrollTop = st <= 0 ? 0 : st;
  };

  return (
    <>
      <div
        className="flex flex-wrap gap-4 h-[65vh] overflow-auto"
        onScroll={handleOnScroll}
      >
        {moviesData.data &&
          moviesData.data.results.map((movie: MovieInfo, index: number) => {
            const formattedMovie = JSON.stringify(movie);
            const copiedMovie = JSON.parse(formattedMovie) as MovieInfo;
            copiedMovie.poster_path =
              process.env.SMALL_IMG_PREFIX + movie.poster_path;

            return (
              <div key={`${index}_${movie.id}`} className="card">
                <MovieCard movieData={copiedMovie} />
              </div>
            );
          })}
      </div>
    </>
  );
}
