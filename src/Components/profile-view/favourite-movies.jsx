import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

const FavoriteMovies = ({ urlAPI, user, token, movies }) => {

    console.log(user.favorite);
    console.log(movies);
    let favoriteMovies = user.favorite ? movies.filter(m => user.favorite.includes(m._id)) : [];

    return (
        <>
            <h2>Your Favorite Movies</h2>
            <Row className="justify-content-md-center">
                {favoriteMovies.length === 0 ? (
                    <Col>You don't have any favorite movies!</Col>
                ) : (
                    <>
                        {favoriteMovies.map((movie) => (
                            <Col className="mb-5" key={movie.id} lg={3} md={6} sm={12}>
                                <MovieCard
                                    urlAPI={urlAPI}
                                    user={user}
                                    token={token}
                                    movie={movie}
                                />
                            </Col>
                        ))}
                    </>
                )}
            </Row>
        </>
    );
};

export default FavoriteMovies;