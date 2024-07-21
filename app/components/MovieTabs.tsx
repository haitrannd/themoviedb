"use client";

import { Tabs } from "flowbite-react";
import { SiThemoviedatabase } from "react-icons/si";
import { MdMovie } from "react-icons/md";
import MovieList from "./MovieList";

export default function MovieTabs() {
  return (
    <>
      <Tabs aria-label="Default tabs" variant="default">
        <Tabs.Item active title="TheMovieDb movies" icon={SiThemoviedatabase}>
          <MovieList type="now_playing" />
        </Tabs.Item>
        <Tabs.Item title="User-submitted movies" icon={MdMovie}></Tabs.Item>
      </Tabs>
    </>
  );
}
