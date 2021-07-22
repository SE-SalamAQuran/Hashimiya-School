import { React, useState } from 'react';
import axios from "axios";
import { Col, Row, Toast, Form, Button } from "react-bootstrap";

export default function TeachersLoginForm() {
    const [state, setState] = useState({
        emailPhone: "",
        password: "",
    });
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });


    function handleChange(event) {
        const { name, value } = event.target;
        setState((prev) => {
            if (name === "emailPhone") {
                return {
                    emailPhone: value,
                    password: prev.password,
                };
            } else if (name === "password") {
                return {
                    emailPhone: prev.emailPhone,
                    password: value,
                };
            }
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        const cred = {
            emailPhone: state.emailPhone,
            password: state.password,
        };
        axios
            .post("http://localhost:5000/teachers/login", cred)
            .then((res) => {
                setMessage({
                    type: "alert alert-success",
                    header: "Success",
                    text: "Logged in successfully",
                });
                setShow(true);
                window.location = "/";
                const token = res.data.token;
                sessionStorage.setItem("token", token);
                let thisUser = res.data.decoded;
                sessionStorage.setItem("user", JSON.stringify(thisUser));
            })
            .catch((res) => {
                //handle error
                setMessage({
                    type: "alert alert-danger",
                    header: "Failed",
                    text: "Incorrect username or password",
                });
                setShow(true);
            });
    }
    return (
        <div style={{ marginTop: "5em" }} className="container">
            <h3>Login as a Teacher</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{ width: "50%", margin: "auto", padding: "10px" }} controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={state.emailPhone}
                        onChange={handleChange}
                        type="email"
                        name="emailPhone"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group style={{ width: "50%", margin: "auto", padding: "10px" }} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="outline-success" className="btn btn-md" style={{ marginTop: "2rem" }} type="submit">
                    Login
                    <br />
                    <img src="https://img.icons8.com/dotty/30/000000/login-rounded-right.png" style={{ marginLeft: "3px" }}
                        alt="login-icon" />

                </Button>

                <Row>
                    <Col xs={12}>
                        <Toast
                            onClose={() => setShow(false)}
                            show={show}
                            style={{
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                            delay={3000}
                            autohide
                        >
                            <div className={message.type}>
                                <strong className="mr-auto">{message.header}</strong>
                                <br></br>
                                <small>{message.text}</small>
                            </div>
                        </Toast>
                    </Col>
                </Row>
            </Form>

        </div>
    )
}
