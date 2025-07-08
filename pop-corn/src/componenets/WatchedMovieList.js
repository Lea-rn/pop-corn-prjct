export default function WatchedMovieList({ watched }) {
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