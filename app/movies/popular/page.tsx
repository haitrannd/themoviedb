import MovieList from "@/app/components/MovieList";

export default async function Home() {
  return (
    <>
      <h1 className="text-4xl text-cyan-700 font-bold mb-4 border-l-4 border-cyan-700 pl-2 h-[53px]">
        Popular movies .
      </h1>
      <MovieList type="popular" />
    </>
  );
}
