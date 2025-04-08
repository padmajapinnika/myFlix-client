import React, { useEffect, useState } from 'react';
import UserInfo from './user-info';
import FavoriteMovies from './favourite-movies';
import UpdateUser from './update-user';

const ProfileView = ({ urlAPI, user, token, movies ,setUser}) => {
    
    return (
        <>
            <UserInfo
                Username={user.Username}
                email={user.email}
            />
            <FavoriteMovies
                urlAPI={urlAPI}
                user={user}
                setUser={setUser}
                token={token}
                movies={movies}
            />
            <UpdateUser
                urlAPI={urlAPI}
                user={user}
                token={token}
                setUser={setUser}
            />


        </>
    );
};

export default ProfileView;