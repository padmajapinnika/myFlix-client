import PropTypes from 'prop-types';
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div onClick={() => onMovieClick(movie)}>
        <h3>{movie.title}</h3>
    </div>
    );
  };
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired, // Ensures that movie has a title of type string
    }).isRequired, // Ensures that movie prop is passed
    onClick: PropTypes.func.isRequired, // Ensures that onClick is a function
  };