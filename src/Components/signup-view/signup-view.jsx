import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SignupView = () => {
    //const urlAPI = "http://localhost:8080";
    const urlAPI = "https://movie-api-padma-7528be21ca05.herokuapp.com";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            password: password,
            email: email,
            Birthday: birthday
        };

        fetch(urlAPI + "/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.replace("/")
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
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
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
            />
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
};