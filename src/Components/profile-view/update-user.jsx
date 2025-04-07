import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";


const UpdateUser = ({ urlAPI, user, token }) => {

    const [userData, setUser] = useState(user);
    console.log(userData.Username);

    const [username, setUsername] = useState(user?.Username||"");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user?.email|| "");
    const [Birthday, setBirthday] = useState(
        user?.Birthday ? new Date(user.Birthday).toISOString().split('T')[0] : ""
    );
      
      

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("User data before update:", user);
        console.log("Updating user:", username);
        const data = {
            Username: username || user.Username,
            password: password,
            email: email,
            Birthday: Birthday
        };

        console.log(data);

        console.log(user?.Username);

        fetch(`${urlAPI}/users/${username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Profile udpate successful");
                response.json().then((updatedUser) => {
                    window.location.reload(); 
                });
            } else {
                alert("Profile udpate failed");
            }
        });
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Label>
                    Username:
                </Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
                <Form.Label>
                    Password:
                </Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Form.Label>
                    Email:
                </Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Form.Label>
                    Birthday:
                </Form.Label>
                <Form.Control
                    type="date"
                    value={Birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
                <Row>
                    <Col><Button variant="primary" type="submit">Update Profile</Button></Col>
                    <Col><Button variant="secondary" type="button" onClick={() => {
                        fetch(urlAPI + "/users/" + user.Username, {
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            if (response.ok) {
                                alert("Profile deleted successful");
                                localStorage.clear();
                                window.location.reload();  // Optionally reload the page
                            } else {
                                alert("Profile udpate failed");
                            }
                        });
                    }}>Detele Account</Button></Col>
                </Row>
            </Form>
        </>
    );
};

export default UpdateUser;