import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("https://swapi.dev/api/films/");
      if (!resp.ok) {
        throw new Error("Error occured: " + resp.status);
      }
      const obj = await resp.json();
      const data = obj.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  /*
  const fetchMovies = () => {
    fetch("https://swapi.dev/api/films/")
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        const data = obj.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
          };
        });
        setMovies(data);
      });
  };
  */

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Show Movies !</button>
      </section>
      <section>
        {error && <p>{error}</p>}
        {loading && <p>Looking for movies ...</p>}
        {!loading && movies.length === 0 && !error && <p> Click the button </p>}
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
