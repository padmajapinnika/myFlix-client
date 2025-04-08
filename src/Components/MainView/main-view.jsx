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
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const urlAPI = "https://movie-api-padma-7528be21ca05.herokuapp.com";

  useEffect(() => {
    if (!token) return;
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return;

    fetch(urlAPI + "/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const userFound = data.find((u) => u._id === storedUser._id);
        if(userFound){
        setUser(userFound);
        }
      });

    fetch(urlAPI + "/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data); 
      })
      .catch((err) => setError("Failed to fetch movies"));
  }, [token]);  // Depend on token
   // Handle movie search
   useEffect(() => {
    if (!searchQuery) {
      setFilteredMovies(movies); // If search query is empty, show all movies
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchQuery, movies]);
  

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
                    <SignupView
                     urlAPI={urlAPI} />
                  </Col>
                )}
              </>
            }
          />
                   
 
           {/* Profile Route */}
           <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={8}>
                                        <ProfileView
                                            urlAPI={urlAPI}
                                            user={user}
                                            token={token}
                                            movies={movies}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>

                        }
                    />
            <Route
             path="/login"
             element={
              <>
                     {user ? (
                         <Navigate to="/" />
                     ) : (
                         <Col md={5}>
                             <LoginView
                                 urlAPI={urlAPI}
                                 onLoggedIn={(user, token) => {
                                     setUser(user);
                                     console.log(user);
                                     localStorage.setItem("user", JSON.stringify(user));
                                     setToken(token);
                                     localStorage.setItem("token", token);
                                 }} />
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
                    <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                ) : (
                    <Col md={8}>
                        <MovieView
                            urlAPI={urlAPI}
                            user={user}
                            token={token}
                            movies={movies} />
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
                  <Navigate to="/login" replace/>
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (

                  <>
                  {/* Search Input for Filtering */}
                  <input
                      type="text"
                      className="form-control my-3"
                      placeholder="🔎Search movies by title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {filteredMovies.map((movie) => (
                      <Col className="mb-5" key={movie._id} lg={3} md={4} sm={12}>
                        <MovieCard
                        movie={movie}
                        user={user}
                        token={token}
                        urlAPI={urlAPI}
                        setUser={setUser}
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