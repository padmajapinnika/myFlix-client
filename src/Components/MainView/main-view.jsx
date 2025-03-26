import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { useState, useEffect } from "react";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
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
          <>
            <LoginView onLoggedIn={handleLoggedIn} />
            <p>or</p>
            <SignupView />
          </>
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
            <div>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)} // Clicking back will show the movie list again
                />
                <hr />
                <h2>Similar Movies</h2>
                {/* Display similar movies to the selected movie */}
                {similarMovies.map((movie) => (
                    <MovieCard
                    key={movie._id}
                        movie={movie}
                        onMovieClick={(newSelection) => setSelectedMovie(newSelection)} // Set selected movie
                    />
                ))}
            </div>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <h2>Movie List</h2>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelection) => {
                        setSelectedMovie(newSelection);
                    }}
                />
            ))}
        </div>
    );
};