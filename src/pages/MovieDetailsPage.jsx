import { useParams, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWNkZTAwNjY4NjA0Zjc4NmI4MDNhYmY2MGQ0N2NlYiIsIm5iZiI6MTc0MjQ4OTA1MS4yNDg5OTk4LCJzdWIiOiI2N2RjNDVkYmM2MGQ1MTc3YWRlYTFlYTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.E8Wli32hKS5hdaXasn07dZt0S3k3yj9ymOTAqkKH0Vk";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/${movieId}?language=en-US`, {
        headers: { Authorization: API_KEY },
      })
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      {/* Кнопка назад */}
      <button onClick={() => navigate(location.state?.from ?? "/movies")}>⬅ Назад</button>

      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>

      <nav>
        <Link to="cast" state={{ from: location.state?.from }}>Cast</Link>
        <Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
