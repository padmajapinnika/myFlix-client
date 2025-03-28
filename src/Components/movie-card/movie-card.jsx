import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className="h-100">
      <Card.Img variant="top" src={movie.imagePath} className="w-100" />
      <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.name}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
              View Details
              </Button>
         </Card.Body>
    </Card>
    );
  };
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired, // Ensures that movie has a title of type string
    }).isRequired, // Ensures that movie prop is passed
    onMovieClick: PropTypes.func.isRequired, // Ensures that onClick is a function
  };

