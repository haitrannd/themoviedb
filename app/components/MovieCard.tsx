"use client";

import { Button, Card } from "flowbite-react";
import { MovieInfo } from "../lib/type";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

type Props = {
  movieData: MovieInfo;
};

export default function MovieCard(props: Props) {
  const { movieData } = props;

  return (
    <>
      <div className="h-full">
        <Card
          className="max-w-sm h-full"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={process.env.SMALL_IMG_PREFIX + movieData.poster_path}
        >
          <h3
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1 md:text-2xl"
            title={movieData.title}
          >
            {movieData.title}
          </h3>
          <p
            className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3"
            title={movieData.overview}
          >
            {movieData.overview}
          </p>
          <Button>
            <Link href={`/movie/${movieData.id}`}>Detail</Link>
            <IoIosArrowForward className="h-full ml-4" />
          </Button>
        </Card>
      </div>
    </>
  );
}
