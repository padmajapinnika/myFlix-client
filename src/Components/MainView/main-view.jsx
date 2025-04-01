import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { useState, useEffect } from "react";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";
import { Col,Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const url = "https://movie-api-padma-7528be21ca05.herokuapp.com";

  useEffect(() => {
    if (!token) {
      return
    }
    fetch(url+ "/users", {
      headers: { Authorization: `Bearer ${token}` }
  })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          let userFound = data.find(u => u._id === user._id);
          setUser(userFound);

      });
    fetch(url + "/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => setError("Failed to fetch movies"));
  }, [token]);

  const handleLoggedIn = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <BrowserRouter>
     <NavigationBar user={user} onLoggedOut={handleLogout} /> 
      <Row className="justify-content-md-center">
        <Routes>
          {/* Signup Route */}
         
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
           {/* Profile Route */}
           <Route
            path="/profile"
            element={user ? (
              <Col md={8}>
                <ProfileView url={url} user={user} token={token} movies={movies} />
              </Col>
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={handleLoggedIn} />
                  </Col>
                )}
              </>
            }
          />
 
          {/* Movie Details Route */}
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col md={8}>
                    <MovieView
                    />
                  </Col>
                )}
              </>
            }
          />

          {/* Movie List Route */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <Col sm={12}>
                      <h2>Movie List</h2>
                    </Col>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} lg={3} md={4} sm={12}>
                        <MovieCard
                          movie={movie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
