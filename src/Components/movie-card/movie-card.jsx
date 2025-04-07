import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ urlAPI, user, token, movie ,setUser}) => {

    const favouriteFlag = user?.favoriteMovies?.includes(movie._id);

    if (!user) {
      return <div>Please log in to manage favorites.</div>;
    }
    const handleAddFavorite = () => {
        fetch(`${urlAPI}/users/${user.Username}/movies/${movie._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add favorite");
          }
          return response.json();
        })
        .then((updatedUser) => {
          setUser(updatedUser); // Update user state
          localStorage.setItem("user", JSON.stringify(updatedUser)); // (optional)
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to update favorites");
        });
    };
    const handleRemoveFavorite = () => {
        fetch(`${urlAPI}/users/${user.Username}/movies/${movie._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to remove favorite");
            }
            return response.json();
          })
          .then((updatedUser) => {
            setUser(updatedUser); // Update user state
            localStorage.setItem("user", JSON.stringify(updatedUser)); // (optional)
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to update favorites");
          });
      };
      return (
        <Card className="h-100">
          <Card.Img variant="top" src={movie.imagePath} className="w-100" />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director.name}</Card.Text>
          </Card.Body>
          <Card.Footer>
            {favouriteFlag ? (
              <Button variant="secondary" onClick={handleRemoveFavorite}>
                Remove from Favorites
              </Button>
            ) : (
              <Button variant="primary" onClick={handleAddFavorite}>
                Add to Favorites
              </Button>
            )}
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button variant="link">more...</Button>
            </Link>
          </Card.Footer>
        </Card>
      );
    };
    
    MovieCard.propTypes = {
      movie: PropTypes.shape({
        title: PropTypes.string,
        _id: PropTypes.string,
        imagePath: PropTypes.string,
        director: PropTypes.shape({
          name: PropTypes.string,
        }),
      }).isRequired,
      user: PropTypes.shape({
        Username: PropTypes.string,
        favoriteMovies: PropTypes.arrayOf(PropTypes.string),
      }).isRequired,
      token: PropTypes.string.isRequired,
      setUser: PropTypes.func.isRequired,
    };
    
    export default MovieCard;