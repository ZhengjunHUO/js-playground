import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const targetURL =
    "https://react-921c9-default-rtdb.europe-west1.firebasedatabase.app/movies.json";

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      //const resp = await fetch("https://swapi.dev/api/films/");
      const resp = await fetch(targetURL);
      if (!resp.ok) {
        throw new Error("Error occured: " + resp.status);
      }
      const obj = await resp.json();

      const data = [];
      for (const key in obj) {
        data.push({
          id: key,
          title: obj[key].title,
          releaseDate: obj[key].release_date,
          openingText: obj[key].opening_crawl,
        });
      }

      /*
      const data = obj.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      */
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

  async function addMovieHandler(movie) {
    const resp = await fetch(targetURL, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log("Get status: " + resp.status);
    const obj = await resp.json();
    console.log(obj);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
