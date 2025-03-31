import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const MovieCard = ({ movie }) => {
    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.imagePath} className="w-100" />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.name}</Card.Text>
          {/* Replace Button with Link */}
          <Link to={`/movies/${movie._id}`} className="btn btn-link">
            View Details
          </Link>
        </Card.Body>
      </Card>
    );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired, // Ensures that movie has a title of type string
    _id: PropTypes.string.isRequired,   // Ensures that movie has an _id for the link
  }).isRequired, // Ensures that movie prop is passed
};
