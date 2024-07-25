"use client";

import { Tabs } from "flowbite-react";
import { SiThemoviedatabase } from "react-icons/si";
import { MdMovie } from "react-icons/md";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import { DocumentData } from "firebase/firestore";
import { useRef } from "react";
import { useAppSelector, useAppStore } from "../lib/hooks";
import { fetchSubmittedMovie } from "../lib/features/movie/movieSlice";

export default function MovieTabs() {
  const { submittedMovies } = useAppSelector((state) => state.movie);
  const store = useAppStore();
  const initialized = useRef(false);

  if (!initialized.current) {
    store.dispatch(fetchSubmittedMovie());
    initialized.current = true;
  }

  return (
    <>
      <Tabs aria-label="Default tabs" variant="default">
        <Tabs.Item active title="TheMovieDb movies" icon={SiThemoviedatabase}>
          <MovieList type="now_playing" />
        </Tabs.Item>

        <Tabs.Item title="User-submitted movies" icon={MdMovie}>
          <div className="flex flex-col gap-4 submitted-list mt-3">
            {submittedMovies.data &&
              Array.isArray(submittedMovies.data) &&
              submittedMovies.data.map((movie: DocumentData, index: number) => {
                const formattedMovie = JSON.stringify(movie);
                const copiedMovie = JSON.parse(formattedMovie) as DocumentData;
                let formattedGenres = "[]";
                if (movie.genres && typeof movie.genres === "string") {
                  formattedGenres = JSON.parse(movie.genres);
                }
                copiedMovie.genres = formattedGenres;
                return <MovieDetail key={index} movieData={copiedMovie} />;
              })}
          </div>
        </Tabs.Item>
      </Tabs>
    </>
  );
}
