import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

// create the axios instance for no repeation of the key and base url

const apiClient = () =>
  axios.create({
    baseURL: baseUrl,
    params: {
      api_key: apiKey,
    },
  });

export default apiClient;
