export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div className="movie-view">
        <h2>{movie.title}</h2>
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        <p><strong>Description:</strong> {movie.description}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Release Year:</strong> {movie.year}</p>
        <button onClick={onBackClick}>Back to Movie List</button>
      </div>
    );
  };