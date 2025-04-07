import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ urlAPI, user, token, movie }) => {

  //const favouriteFlag = user?.favorite?.find((m) => m === movie._id);
  const favouriteFlag = user?.favoriteMovies?.includes(movie._id);
  if (!user) {
    return <div>Please log in to manage favorites.</div>;
  }
    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.imagePath} className="w-100" />
        <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        </Card.Body>
        <Card.Footer>
        {favouriteFlag ?
           (
            <Button variant="secondary" type="button" onClick={() => {
                fetch(urlAPI + "/users/" + user.Username + "/movies/" + movie._id, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.ok) {
                        
                        window.location.reload();  // Optionally reload the page  

                    } else {
                        alert("Udpate failed");
                    }
                });
            }}>Remove from Favourites</Button>
        ) :
        (
            <Button variant="primary" type="button" onClick={() => {
                fetch(urlAPI + "/users/" + user.Username + "/movies/" + movie._id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.ok) {
                        window.location.reload();  // Optionally reload the page                                    
                    } else {
                        alert("Udpate failed");
                    }
                });
            }}>Add to Favourites</Button>
        )
    }

    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Button variant="link">more...</Button>
    </Link>
</Card.Footer>
</Card>
);
};

MovieCard.propTypes = {
movie: PropTypes.shape({
title: PropTypes.string
}).isRequired,
//onMovieClick: PropTypes.func.isRequired
};         