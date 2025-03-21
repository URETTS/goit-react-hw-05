import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    if (query.trim() === "") return;
    setSearchParams({ query });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie name..."
      />
      <button onClick={handleSearch}>Search</button>

      {/* Получаем текущий параметр поиска */}
      <MovieList type="search" query={searchParams.get("query") || ""} />
    </div>
  );
};

export default MoviesPage;
