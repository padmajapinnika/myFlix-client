import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const url = "https://movie-api-padma-7528be21ca05.herokuapp.com/movies"

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMovies(data);
            });
    },[]);

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => {
             movie.genre.name === selectedMovie.genre.name
                && movie.title !== selectedMovie.title;
        })

    console.log(similarMovies);
        return (
            <div>
                {/* Display the selected movie's details */}
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