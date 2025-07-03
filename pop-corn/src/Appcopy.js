import { useEffect, useState } from "react";
import "./App.css";
import StartRating from "./StartRating";

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

const average = (arr) => arr.reduce((acc, cur) => acc + cur / arr.length, 0);

/////// componenet composition .
const Key = "d997c473";

function Appcopy() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // const tempQuery = "batman"

  function handleSelectMovie(id) {
    setSelectedId((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&s=${query}`
          );

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          // console.log(data.Search)
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <div>
      {/* <Navbar movies={movies} /> */}

      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>

      {/* ////// component composition :: */}
      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
          {/* {isLoading ? <Loader/> :   <MovieList movies={movies}/> }  */}
        </ListBox>

        {/* ////// prop drilling ::  */}

        <WatchedBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </WatchedBox>
      </Main>
    </div>
  );
}

export default Appcopy;

////// header ////////////////

function Navbar({ children }) {
  return <div className="nav-bar">{children}</div>;
}

function Loader() {
  return <p className="loader">Loading ...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⚠️</span> {message}
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span>🍿</span> <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      placeholder="Search movies ..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Numresults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

///////////////// main //////////////////////

function Main({ children }) {
  return <main>{children}</main>;
}

function ListBox({ children }) {
  const [isOpen1, setIsopen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsopen1((open) => !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>

      {isOpen1 && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <div>
      {movies.map((movie) => {
        return (
          <Movie
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
          />
        );
      })}
    </div>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <div className="movie-card" onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <div>
        <h3>{movie.Title}</h3>

        <span>📅</span>
        <span>{movie.Year}</span>
      </div>
    </div>
  );
}

function WatchedBox({ children }) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "-" : "+"}
      </button>

      {isOpen2 && children}
    </div>
  );
}

function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot : plot
  } = movie;

  useEffect(function () {
    async function getMovieDetails() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${Key}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data)
    }
    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        ⬅️
      </button>
      <div className="details-overview">
<header>
       <img src={poster} alt={`Poster of ${title}`}/>
     
  <div className="header-movie-info">
        <h2 style={{marginBottom:"10px"}}>{title}</h2> 
      <p style={{marginBottom:"10px"}}>
        {released} . {runtime}
      </p>
      <p style={{marginBottom:"10px"}}>{genre}</p>
      <p style={{marginBottom:"10px"}}>
        <span>⭐</span>
        {imdbRating} IMDB rating
      </p>
  </div>
</header>
      <section className="footer-movie-info">
     
     <div className="rating">
   <StartRating size={24}/>
     </div>

        <p style={{marginBottom:"10px"}}>
          <strong>
            {plot}
          </strong>
        </p>
        <p style={{marginBottom:"10px"}}> <strong style={{fontSize:"20px"}}>Starring :</strong> {actors}</p>
        <p style={{marginBottom:"10px"}}> <strong style={{fontSize:"20px"}}>Directed by : </strong> {director}</p>
      </section>
     </div>
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div className="summary-header">
        <p>
          <span>*️⃣</span>
          <span>{watched.length} movies</span>
        </p>

        <p>
          <span>⭐</span>
          <span>{avgImdbRating}</span>
        </p>

        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>

        <p>
          <span>⌛</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <div>
      {watched.map((movie) => {
        return (
          <div className="watched-movie-card" key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />

            <div>
              <h3>{movie.Title}</h3>
              <div className="summary-info">
                <p>
                  <span>⭐</span>
                  <span>{movie.imdbRating}</span>
                </p>

                <p>
                  <span>🌟</span>
                  <span>{movie.userRating}</span>
                </p>

                <p>
                  <span>⌛</span>
                  <span>{movie.runtime} min</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

//  useEffect (function (){
//   console.log("After initial render")
//  }, [])

//  useEffect (function (){
//   console.log("After every render")
//  })

//  console.log("During render") ;

//  useEffect (function (){
//    console.log("D")
//  }, [query])
