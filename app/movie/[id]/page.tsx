import { getDetailMovie } from "@/app/lib/data";
import MovieDetail from "@/app/components/MovieDetail";

export default async function MovieDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const movieData = await getDetailMovie(params.id);

  return (
    <>
      <MovieDetail movieData={movieData} />
    </>
  );
}
