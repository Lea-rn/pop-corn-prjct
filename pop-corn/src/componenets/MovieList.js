export default function MovieList({ movies, onSelectMovie }) {
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