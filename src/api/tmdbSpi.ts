import apiClient from "./apiClient";

// Create an axios instance using apiClient
const axiosInstance = apiClient();

// Function to fetch popular movies
export async function fetchMovies(endpoint: string) {
  try {
    const response = await axiosInstance.get(endpoint); // Make GET request to the /movie/popular endpoint
    return response?.data; // Return the data from the response
  } catch (error) {
    console.log(error); // Log any errors that occur
  }
}

// Function to fetch top-rated movies
// export async function fetchTopRatedMovies() {
//   try {
//     const response = await axiosInstance.get("/movie/top_rated"); // Make GET request to the /movie/top_rated endpoint
//     return response?.data; // Return the data from the response
//   } catch (error) {
//     console.log(error); // Log any errors that occur
//   }
// }

// Function to generate a full image URL
export const imageUrl = (filename: string, siz: string) => {
  return `https://image.tmdb.org/t/p/${siz}/${filename}`; // Construct and return the full image URL
};
