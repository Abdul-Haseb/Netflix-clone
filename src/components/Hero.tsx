import { useEffect, useState } from "react";
import { fetchMovies, imageUrl } from "../api/tmdbSpi";

// Define the MOVIE interface to type-check movie objects
export interface MOVIE {
  id: number;
  title: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
}

export default function Hero() {
  // State to store the selected movie
  const [movie, setMovie] = useState<MOVIE | null>(null);

  // useEffect hook to fetch and set a random movie when the component mounts
  useEffect(() => {
    const getMovie = async () => {
      // Fetch the popular movies from the API
      const popularMovie = await fetchMovies("/movie/popular");

      // Pick a random movie from the results
      const randomMovie = Math.floor(
        Math.random() * popularMovie?.results.length
      );

      // Set the randomly selected movie to the state
      setMovie(popularMovie?.results[randomMovie]);
    };

    // Call the getMovie function
    getMovie();
  }, []); // Empty dependency array means this effect runs once on mount

  // If movie data is not yet loaded, show a loading indicator
  if (!movie)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  // Destructure movie properties
  const { title, release_date, backdrop_path, overview } = movie;

  // Helper function to truncate text to a specific length
  const trancate = (str: string, length: number) => {
    if (!str) return ""; // Return an empty string if input is undefined
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  return (
    <div className="relative w-full h-screen md:h-[80vh]">
      {/* Background image of the movie */}
      <img
        src={imageUrl(backdrop_path, "original")} // Generate the image URL using backdrop_path
        alt={title} // Alt text for the image
        className="w-full h-full object-cover object-top"
      />
      {/* Overlay for text and buttons */}
      <div className="absolute inset-0 bg-gradient-to-r from-black z-20 flex flex-col justify-end pb-10 md:pb-20 lg:pb-52">
        {/* Container for the movie information */}
        <div className="text-white px-4 md:px-8">
          {/* Movie title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h1>
          {/* Action buttons */}
          <div className="flex items-center gap-3 md:gap-4 mt-4 mb-2 md:mt-6 md:mb-4">
            <button className="px-4 text-sm md:text-base py-1.5 md:px-5 md:py-2 hover:bg-gray-200 hover:text-black transition-colors duration-200 ease-in border rounded-sm">
              Play
            </button>
            <button className="px-4 text-sm md:text-base py-1.5 md:px-5 md:py-2 bg-gray-100 text-black hover:bg-transparent hover:text-white transition-colors duration-200 ease-in border rounded-sm">
              Watch Later
            </button>
          </div>
          {/* Release date of the movie */}
          <p className="text-xs md:text-sm text-gray-400">{release_date}</p>
          {/* Movie overview, truncated if too long */}
          <p className="tracking-wider font-n-light w-full lg:max-w-[50%] xl:max-w-[40%] text-gray-200 text-sm md:text-base">
            {trancate(overview, 160)}
          </p>
        </div>
      </div>
    </div>
  );
}
