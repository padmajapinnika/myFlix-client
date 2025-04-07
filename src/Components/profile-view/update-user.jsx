import React, { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";

const UpdateUser = ({ urlAPI, user, token, setUser }) => {
    const [username, setUsername] = useState(user?.Username || "");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user?.email || "");
    const [birthday, setBirthday] = useState(
        user?.Birthday ? new Date(user.Birthday).toISOString().split('T')[0] : ""
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            Username: username,
            password:password,
            email:email,
            Birthday: birthday
        };

        fetch(`${urlAPI}/users/${user.Username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Update failed");
            }
            return response.json();
        })
        .then((updatedUser) => {
            alert("Profile updated successfully!");
            setUser(updatedUser); // Update user in parent/global state
            localStorage.setItem("user", JSON.stringify(updatedUser)); // Optional: store updated user
            // window.location.reload(); // Optional: refresh page
        })
        .catch((error) => {
            alert("Error updating profile: " + error.message);
        });
    };

    const handleDelete = () => {
        fetch(`${urlAPI}/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (response.ok) {
                alert("Profile deleted successfully");
                localStorage.clear();
                //window.location.reload();
            } else {
                alert("Failed to delete profile");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label>Username:</Form.Label>
            <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
            />

            <Form.Label>Password:</Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <Form.Label>Email:</Form.Label>
            <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <Form.Label>Birthday:</Form.Label>
            <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
            />

            <Row className="mt-3">
                <Col>
                    <Button variant="primary" type="submit">Update Profile</Button>
                </Col>
                <Col>
                    <Button variant="danger" type="button" onClick={handleDelete}>
                        Delete Account
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default UpdateUser;
