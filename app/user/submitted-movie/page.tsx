"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { message } from "antd";

type Inputs = {
  poster_path: string;
  original_title: string;
  overview: string;
  genres: string;
  popularity: string;
};

export default function UserSumittedMovie() {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { poster_path, original_title, overview, genres, popularity } = data;
    let genreArray = genres.split(`,`);
    let formattedGenres = [];
    for (let i in genreArray) {
      formattedGenres.push({
        key: i,
        name: genreArray[i].trim(),
      });
    }

    const submittedMovies = localStorage.getItem("submitted_movies");
    if (!submittedMovies) {
      let submittedMoviesArray = [];
      submittedMoviesArray.push({
        poster_path,
        original_title,
        overview,
        genres: formattedGenres,
        popularity,
      });
      localStorage.setItem(
        "submitted_movies",
        JSON.stringify(submittedMoviesArray)
      );
    } else {
      let submittedMoviesArray = JSON.parse(submittedMovies);
      submittedMoviesArray.push({
        poster_path,
        original_title,
        overview,
        genres: formattedGenres,
        popularity,
      });
      localStorage.setItem(
        "submitted_movies",
        JSON.stringify(submittedMoviesArray)
      );
    }

    setIsSubmitSuccessful(true);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      message.success("Submit the movie successfully.", 3);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="poster_path" value="Movie poster path" />
        </div>
        <TextInput
          id="poster_path"
          type="text"
          placeholder="Poster path"
          required
          defaultValue={`https://image.tmdb.org/t/p/original/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg`}
          {...register("poster_path")}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="original_title" value="Movie title" />
        </div>
        <TextInput
          id="original_title"
          type="text"
          required
          {...register("original_title")}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="overview" value="Movie description" />
        </div>
        <TextInput
          id="overview"
          type="textarea"
          required
          {...register("overview")}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="genres" value="Movie genre(s)" />
        </div>
        <TextInput id="genres" type="text" required {...register("genres")} />
        <small>
          <i>
            If there are more than 2 genres, please separate them with a comma.
          </i>
        </small>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="popularity" value="Movie popularity" />
        </div>
        <TextInput
          id="popularity"
          type="text"
          required
          {...register("popularity")}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
