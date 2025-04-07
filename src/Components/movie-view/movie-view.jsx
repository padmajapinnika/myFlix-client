import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const urlAPI = "https://movie-api-padma-7528be21ca05.herokuapp.com";

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
      setError("Unauthorized: No token provided");
      return;
    }

    fetch(`${urlAPI}/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in header
      },
    })
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((err) => setError("Failed to fetch movie details"));
  }, [movieId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="movie-view">
      <h2>{movie.title}</h2>
      <img src={movie.ImagePath} alt={movie.title} className="movie-poster" />
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Director:</strong> {movie.director.name}</p>
      <p><strong>Bio:</strong> {movie.director.bio}</p>
      <p><strong>Genre:</strong> {movie.genre.name || "Not Available"}</p>
      <p><strong>Release Year:</strong> {movie.releaseYear || "Not Available"}</p>
      <p><strong>Featured:</strong> {movie.featured}</p>
      <Link to="/" className="back-button">
        Back to Movie List
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movieId: PropTypes.string.isRequired,
};