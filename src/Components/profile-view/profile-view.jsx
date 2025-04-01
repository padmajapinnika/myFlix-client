import React, { useEffect, useState } from 'react';
import UserInfo from './user-info';
import FavoriteMovies from './favourite-movies';
import UpdateUser from './update-user';

const ProfileView = ({ url, user, token, movies }) => {

    return (
        <>
            <UserInfo
                Username={user.Username}
                email={user.email}
            />
            <FavoriteMovies
                url={url}
                user={user}
                token={token}
                movies={movies}
            />
            <UpdateUser
                url={url}
                user={user}
                token={token}
            />

        </>
    );
};

export default ProfileView;