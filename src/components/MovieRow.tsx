import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { MOVIE } from "./Hero";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

export default function MovieRow({ title, getMovies }: any) {
  const [movies, setMovies] = useState<MOVIE[]>([]);
  const rowId = Math.floor(Math.random() * 1000);

  // Fetch movies when the component is mounted
  useEffect(() => {
    const fetchAndSetMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
    };
    fetchAndSetMovies();
  }, [getMovies]); // Include getMovies in the dependency array to avoid warnings

  const slider = (offset: number) => {
    const sliderScroll = document.getElementById(
      "slider" + rowId
    ) as HTMLElement | null;

    if (sliderScroll) {
      sliderScroll.scrollLeft = sliderScroll.scrollLeft + offset;
    }
  };
  return (
    <>
      {movies && (
        <>
          <h1 className="font-n-bold md:text-xl px-4 pt-4 pb-1">{title}</h1>
          <div className="flex items-center relative group">
            <MdChevronLeft
              onClick={() => slider(-500)}
              size={40}
              className="bg-white text-black rounded-full group-hover:block hidden absolute left-2 z-50 cursor-pointer"
            />
            <div
              id={`slider` + rowId}
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide px-2 "
            >
              {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </div>
            <MdChevronRight
              onClick={() => slider(500)}
              size={40}
              className="bg-white text-black rounded-full group-hover:block hidden absolute right-2 z-50 cursor-pointer"
            />
          </div>
        </>
      )}
    </>
  );
}
