import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        title: "Inception",
        description: "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
        posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvGlj0u5fN1YQO1a6lRU6F.jpg",
        genre: "Sci-Fi, Action",
        director: "Christopher Nolan",
        year: 2010
      },
      {
        id: 2,
        title: "The Matrix",
        description: "A hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        posterUrl: "https://image.tmdb.org/t/p/w500/8cFmhV7DRe2Nk4mr7NkK0UzcGKv.jpg",
        genre: "Action, Sci-Fi",
        director: "The Wachowskis",
        year: 1999
      },
      {
        id: 3,
        title: "The Dark Knight",
        description: "Batman faces the Joker, a criminal mastermind who seeks to plunge Gotham City into anarchy.",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        genre: "Action, Crime, Drama",
        director: "Christopher Nolan",
        year: 2008
      }
    ]);

  
    const [selectedMovie, setSelectedMovie] = useState(null);
  
    return (
      <div>
        {selectedMovie ? (
          <MovieView movie={selectedMovie} />
        ) : (
          <div>
            {movies.map((movie) => (
              <div key={movie.id} onClick={() => setSelectedMovie(movie)}>
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };