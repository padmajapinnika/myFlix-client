import React, { useEffect, useState } from 'react';
import { Row, Col } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

const FavoriteMovies = ({ urlAPI, user, token, movies }) => {

    console.log(user.favoriteMovies);
    console.log(movies);
    let favoriteMovies = user.favoriteMovies ? movies.filter(m => user.favoriteMovies.includes(m._id)) : [];
 
    if (!user) {
        return <div>Please log in to manage favorites.</div>;
    }
    return (
        <>
            <h2>Your Favorite Movies</h2>
            <Row className="justify-content-md-center">
                {favoriteMovies.length === 0 ? (
                    <Col>You don't have any favorite movies!</Col>
                ) : (
                    <>
                        {favoriteMovies.map((movie) => (
                            <Col className="mb-5" key={movie._id} lg={3} md={6} sm={12}>
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