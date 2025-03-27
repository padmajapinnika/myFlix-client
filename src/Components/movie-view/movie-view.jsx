import PropTypes from 'prop-types';
import "./movie-view.scss";
export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div className="movie-view">
        <h2>{movie?.title}</h2>
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        <p><strong>Description:</strong> {movie.description}</p>    
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Genre:</strong> {movie.genre || 'Not Available'}</p>
        <p><strong>Release Year:</strong> {movie.releaseYear|| 'Not Available'}</p>
        <button className="back-button"onClick={onBackClick}>Back to Movie List</button>
      </div>
    );
  };
  MovieView.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string,
      }),
      director: PropTypes.shape({
        name: PropTypes.string,
      }),
      releaseYear: PropTypes.number,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
  };