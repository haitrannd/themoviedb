import { MovieDetail as MovieDetailType } from "../lib/type";
import Image from "next/image";

type Props = {
  movieData: MovieDetailType;
};

export default function MovieDetail(props: Props) {
  const { movieData } = props;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-100 h-[calc((100vw-40px)*3/2)] md:w-[20rem] md:h-[30rem] relative">
        <Image
          src={process.env.SMALL_IMG_PREFIX + movieData.poster_path}
          alt={movieData.original_title}
          style={{ objectFit: "contain" }}
          fill
          sizes="100%"
        ></Image>
      </div>
      <div className="w-100 md:w-1/2 p-[20px]">
        <h1 className="font-bold text-2xl pb-4">{movieData.original_title}</h1>
        <p className="pb-4">
          <i>{movieData.overview}</i>
        </p>
        <p className="pb-4">
          <b>Genres: </b>
          {movieData.genres.map(
            (genre: { id: number; name: string }, index: number) => {
              if (index !== movieData.genres.length - 1)
                return <span key={genre.id}>{`${genre.name}, `}</span>;
              else return <span key={genre.id}>{genre.name}</span>;
            }
          )}
        </p>
        <p className="pb-4">
          <b>Release date:</b> {movieData.release_date}
        </p>
        <p className="pb-4">
          <b>Popularity:</b> {movieData.popularity}
        </p>
      </div>
    </div>
  );
}
