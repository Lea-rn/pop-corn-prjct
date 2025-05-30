import { useState } from "react";
import "./App.css";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App() {
  return (
    <div>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;

////// header ////////////////

function Navbar() {
  return (
    <div className="nav-bar">
      <Logo />
      <Search />
      <Numresults />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span>🍿</span> <h1>usePopcorn</h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      placeholder="Search movies ..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Numresults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}

///////////////// main //////////////////////

function Main() {
  return (
    <main>
      <ListBox />
      <WatchedBox />
    </main>
  );
}

function ListBox() {
  const [isOpen1, setIsopen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsopen1((open)=> !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>

      {isOpen1 && <MovieList />}
    </div>
  );
}

function MovieList() {
  return (
    <div>
      {tempMovieData.map((movie) => {
        return (
          <div className="movie-card" key={movie.imdbID} >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <div>
              <h3>{movie.Title}</h3>

              <span>📅</span>
              <span>{movie.Year}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WatchedBox() {
  return (
    <div className="box">
      <h1>watched box</h1>
    </div>
  );
}
