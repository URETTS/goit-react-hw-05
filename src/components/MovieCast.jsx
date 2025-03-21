import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWNkZTAwNjY4NjA0Zjc4NmI4MDNhYmY2MGQ0N2NlYiIsIm5iZiI6MTc0MjQ4OTA1MS4yNDg5OTk4LCJzdWIiOiI2N2RjNDVkYmM2MGQ1MTc3YWRlYTFlYTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.E8Wli32hKS5hdaXasn07dZt0S3k3yj9ymOTAqkKH0Vk";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/${movieId}/credits?language=en-US`, {
        headers: { Authorization: API_KEY },
      })
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>{actor.name} as {actor.character}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
