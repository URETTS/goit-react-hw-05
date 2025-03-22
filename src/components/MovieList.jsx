import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWNkZTAwNjY4NjA0Zjc4NmI4MDNhYmY2MGQ0N2NlYiIsIm5iZiI6MTc0MjQ4OTA1MS4yNDg5OTk4LCJzdWIiOiI2N2RjNDVkYmM2MGQ1MTc3YWRlYTFlYTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.E8Wli32hKS5hdaXasn07dZt0S3k3yj9ymOTAqkKH0Vk"; 

const MovieList = ({ type, query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const url =
      type === "popular"
        ? `${API_URL}/movie/popular?language=en-US&page=1`
        : query && query.trim() !== ""
        ? `${API_URL}/search/movie?query=${query}&language=en-US&page=1`
        : `${API_URL}/movie/popular?language=en-US&page=1`;

    axios
      .get(url, { headers: { Authorization: API_KEY } })
      .then(res => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [type, query]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <ul>
      {movies.length > 0 ? (
        movies.map(movie => (
          <li key={movie.id}>
            <Link 
              to={`/movies/${movie.id}`} 
              state={{ from: location.pathname, searchParams: searchParams.toString() }}>
              {movie.title}
            </Link>
          </li>
        ))
      ) : (
        <p>Фильмы не найдены</p>
      )}
    </ul>
  );
};

export default MovieList;
