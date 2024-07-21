"use client";

import { Tabs } from "flowbite-react";
import { SiThemoviedatabase } from "react-icons/si";
import { MdMovie } from "react-icons/md";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";

export default function MovieTabs() {
  let submittedMovies: [] | string | null =
    localStorage.getItem("submitted_movies");
  if (submittedMovies) {
    submittedMovies = JSON.parse(submittedMovies);
  } else {
    submittedMovies = [];
  }

  return (
    <>
      <Tabs aria-label="Default tabs" variant="default">
        <Tabs.Item active title="TheMovieDb movies" icon={SiThemoviedatabase}>
          <MovieList type="now_playing" />
        </Tabs.Item>
        <Tabs.Item title="User-submitted movies" icon={MdMovie}>
          {submittedMovies && Array.isArray(submittedMovies) && (
            <>
              <div className="flex flex-col gap-4">
                {submittedMovies.map((movie, index) => (
                  <MovieDetail key={index} movieData={movie} />
                ))}
              </div>
            </>
          )}
        </Tabs.Item>
      </Tabs>
    </>
  );
}
