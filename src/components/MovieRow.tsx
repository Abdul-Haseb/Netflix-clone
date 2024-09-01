import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { MOVIE } from "./Hero";

export default function MovieRow({ title, getMovies }: any) {
  const [movies, setMovies] = useState<MOVIE[]>([]);

  // Fetch movies when the component is mounted
  useEffect(() => {
    const fetchAndSetMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
    };
    fetchAndSetMovies();
  }, [getMovies]); // Include getMovies in the dependency array to avoid warnings

  return (
    <>
      {movies && (
        <>
          <h1 className="font-n-bold md:text-xl px-4 pt-4 pb-1">{title}</h1>
          <div className="flex items-center relative">
            <div
              id="slider"
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide px-2"
            >
              {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
