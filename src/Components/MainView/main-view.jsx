import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import { Col, Button } from "react-bootstrap";

export const MainView = () => {
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const [movies, setMovies] = useState('');
    const [selectedMovie, setSelectedMovie] = useState('');
    const [error, setError] = useState('');
    const url = "https://movie-api-padma-7528be21ca05.herokuapp.com"
 
    useEffect(() => {
        if (!token) {
            return;
        }
        fetch(url + "/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMovies(data);
            });
    },[token]);
    const handleLoggedIn = (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); 
        setUser(user);
        setToken(token);
      };
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); 
        setUser(null);
        setToken(null);
      };
    
    if (!user) {
        return (
            <Row className="justify-content-md-center">
                <Col md={5}>
            <LoginView onLoggedIn={handleLoggedIn} />
            <p>or</p>
            <SignupView />
            </Col>
            </Row>
        );
      }
      if (error) {
        return <div>Error: {error}</div>;
      }
    

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => {
            return  movie.genre === selectedMovie.genre
                && movie.title !== selectedMovie.title;
        })

        console.log(similarMovies);
        return (
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)} // Clicking back will show the movie list again
                    />
                    <hr />
                    <h2>Similar Movies</h2>
                    <Row className="justify-content-md-center">
                        {similarMovies.map((movie) => (
                            <Col className="mb-5" key={movie._id} lg={3} md={4} sm={12}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelection) => setSelectedMovie(newSelection)}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <Row>
             
             <Col sm={12}>
            <h2>Movie List</h2>
        </Col>
            {movies.map((movie) => (
                 <Col className="mb-5" key={movie._id} lg={2} md={3} sm={12}>
                <MovieCard
                    movie={movie}
                    onMovieClick={(newSelection) => {
                        setSelectedMovie(newSelection);
                    }}
                />
                </Col>
            ))}
             <Col sm={12}>
            <button onClick={handleLogout}>Logout</button>
            </Col>
        </Row>
    );
}