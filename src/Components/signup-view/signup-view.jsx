import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const SignupView = () => {
  const urlAPI = "https://movie-api-padma-7528be21ca05.herokuapp.com";
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Username: Username,
      password: password,
      email: email,
      Birthday: Birthday,
    };

    fetch(urlAPI + "/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful! You can now log in.");
          window.location.reload();
        } else {
          alert("Signup failed. Please try again.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form.Label>
        Username:
        </Form.Label>
        <Form.Control
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      <Form.Label>
        password:
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
        <Form.Control
          type="date"
          value={Birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Label>
      <button variant="primary" type="submit">Sign Up</button>
    </form>
  );
};

