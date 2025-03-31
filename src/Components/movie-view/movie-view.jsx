import PropTypes from 'prop-types';
import { Button, Form } from "react-bootstrap";
import "./movie-view.scss";
export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie);
    return (
      <div className="movie-view">
        <h2>{movie?.title}</h2>
        <img src={movie.ImagePath} alt={movie.title} className="movie-poster" />
        <p><strong>Description:</strong> {movie.description}</p>    
        <p><strong>Director:</strong> {movie.director.name}</p>
        <p><strong>Bio:</strong> {movie.director.bio}</p>
        <p><strong>Genre:</strong> {movie.genre.name || 'Not Available'}</p>
        <p><strong>Genre Description</strong> {movie.genre.genreDescription || 'Not Available'}</p>
        <p><strong>Release Year:</strong> {movie.releaseYear|| 'Not Available'}</p>
        <p><strong>Featured:</strong> {movie.Featured}</p> 
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
      posterUrl: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
  };