"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import { ChangeEvent, useEffect, useState } from "react";
import { message } from "antd";
import { db } from "@/app/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

type Inputs = {
  poster_path: string;
  original_title: string;
  overview: string;
  genres: string;
  popularity: string;
  poster: File;
};

export default function UserSumittedMovie() {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const readImg = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent: any) => {
      setImgUrl(readerEvent.target.result);
    };
  };

  const uploadFileToFirebase = async (name: string, imgUrl: string) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + name);
    try {
      await uploadString(storageRef, imgUrl, "data_url");
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const addDataToFireStore = async ({
    original_title,
    overview,
    genres,
    popularity,
  }: {
    original_title: string;
    overview: string;
    genres: string;
    popularity: string;
  }) => {
    try {
      let downloadUrl = "";
      if (imgUrl) {
        downloadUrl = await uploadFileToFirebase(original_title, imgUrl);
      }
      const docRef = await addDoc(collection(db, "submitted_movies"), {
        original_title,
        overview,
        genres,
        popularity,
        poster_path: downloadUrl,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { original_title, overview, genres, popularity } = data;

    let genreArray = genres.split(`,`);
    let formattedGenres = [];
    for (let i in genreArray) {
      formattedGenres.push({
        key: i,
        name: genreArray[i].trim(),
      });
    }
    const formattedGenresString = JSON.stringify(formattedGenres);

    const added = await addDataToFireStore({
      original_title,
      overview,
      genres: formattedGenresString,
      popularity,
    });
    if (added) {
      setIsSubmitSuccessful(true);
    }
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
        <FileInput id="poster" {...register("poster")} onChange={readImg} />
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
