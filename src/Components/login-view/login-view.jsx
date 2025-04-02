import React, { useState } from 'react';
import { Form,Button } from "react-bootstrap";
export const LoginView = ({ onLoggedIn }) => {
  const url="https://movie-api-padma-7528be21ca05.herokuapp.com";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 const handleSubmit =  (e) => {
        e.preventDefault();
        const data = {
          Username: username,
          password: password,
          };
          console.log(data);
       
          fetch(url + "/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((data) => {
            console.log("Login response: ", data)
              // Check if user and token exist in response
              if (data.user) {
              // Store user and token in localStorage for persistence
              localStorage.setItem("user", JSON.stringify(data.user));
              localStorage.setItem("token", data.token);
              onLoggedIn(data.user, data.token); // Pass user and token to MainView
            } else {
              alert("Login failed. Please check your credentials.");
            }
          })
          .catch((error) => alert("Something went wrong. Please try again."));
      };

      return (
        <form onSubmit={handleSubmit}>
           <Form.Group controlId="formUsername">
          <Form.Label>
            Username:
            </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength="5"
              required
            />
            </Form.Group>
            <Form.Group controlId="formPassword">
            <Form.Label>
            Password:
            </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="5"
              required
            />
            </Form.Group>
          <button variant="primary" type="submit">Submit</button>
        </form>
      );
    };
    