import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

const API_URL = "https://api.themoviedb.org/3/trending/movie/week";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWNkZTAwNjY4NjA0Zjc4NmI4MDNhYmY2MGQ0N2NlYiIsIm5iZiI6MTc0MjQ4OTA1MS4yNDg5OTk4LCJzdWIiOiI2N2RjNDVkYmM2MGQ1MTc3YWRlYTFlYTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.E8Wli32hKS5hdaXasn07dZt0S3k3yj9ymOTAqkKH0Vk";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(`${API_URL}`, {
          headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
          },
        });
          const data = await response.json();
           console.log("Ответ API:", data);
        setMovies(data.results);
      } catch (error) {
        console.error("Помилка завантаження фільмів:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return <MovieList movies={movies} />;
};

export default HomePage;

