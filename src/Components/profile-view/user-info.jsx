import React from 'react';

const UserInfo = ({ Username, email }) => {

    console.log(Username);
    console.log(email);

    return (
        <>
            <p>User : {Username}</p>
            <p>Email: {email}</p>
        </>
    );
};

export default UserInfo;