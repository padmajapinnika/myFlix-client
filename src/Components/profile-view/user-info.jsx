import React from 'react';

const UserInfo = ({ Username, email }) => {
    // Just render the user information without console logs
    return (
        <>
            <p>User: {Username}</p>
            <p>Email: {email}</p>
        </>
    );
};

export default UserInfo;