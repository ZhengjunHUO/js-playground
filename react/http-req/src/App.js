import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    const resp = await fetch("https://swapi.dev/api/films/");
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
  }

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
      {movies.length > 0 && (
        <section>
          <MoviesList movies={movies} />
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
