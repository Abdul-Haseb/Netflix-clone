import Hero from "../components/Hero";
import { fetchMovies } from "../api/tmdbSpi";
import MovieRow from "../components/MovieRow";

export default function Home() {
  // Define the getMovies function which accepts a movie category string
  const getMovies = async (category: string) => {
    const response = await fetchMovies(`${category}`);
    return response?.results; // Make sure you return results, not result
  };

  return (
    <div className="scrollbar-hide">
      <Hero />
      {/* Pass the getMovies function reference without executing it */}
      <MovieRow
        title="Upcoming"
        getMovies={() => getMovies("/movie/upcoming")}
      />
      <MovieRow title="Popular" getMovies={() => getMovies("/movie/popular")} />
      <MovieRow
        title="Top Rated"
        getMovies={() => getMovies("/movie/top_rated")}
      />
      <MovieRow
        title="Treanding"
        getMovies={() => getMovies("/trending/movie/week")}
      />
      <MovieRow
        title="Comedy"
        getMovies={() => getMovies("/discover/movie?with_genres=35")}
      />
    </div>
  );
}
