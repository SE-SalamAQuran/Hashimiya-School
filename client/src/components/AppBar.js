import React from 'react'

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppBar() {
    function isLogged() {
        return JSON.parse(sessionStorage.getItem("user")) == null ? false : true;
    }

    function handleUserClick() {
        let user = JSON.parse(sessionStorage.getItem("user"));

        const userType = user.user_type;
        if (userType === "student") {
            window.location = "profile";
        }
        if (userType === "teacher" && user.isAdmin === false) {
            window.location = "/tprofile";
        }
        if (userType === "teacher" && user.isAdmin === true) {
            window.location = "/aprofile";
        }

    }
    function logOut(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location = "/";
    }
    function UserGreeting(props) {
        return (
            <div>
                <button
                    onClick={logOut}
                    style={{ marginRight: "7px" }}
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    aria-label="logout"
                >
                    <img
                        src="https://img.icons8.com/android/24/ffffff/logout-rounded-left.png"
                        alt="logout"
                        style={{ marginRight: "6px" }}
                    />
                    Logout
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    style={{
                        width: "30px",
                        height: "30px",
                        padding: "6px 0px",
                        borderRadius: "15px",
                        textAlign: "center",
                        fontSize: "12px",
                        lineHeight: "1.42857",
                    }}
                    onClick={handleUserClick}
                >
                    <img
                        src="https://img.icons8.com/windows/20/000000/user-tag.png"
                        alt="avatar"
                    />
                </button>
            </div>
        );
    }

    function handleGuestClick() {
        window.location = "/login";
    }

    function GuestGreeting(props) {
        return (
            <button
                type="button"
                onClick={handleGuestClick}
                className="btn btn-outline-success"
            >
                <span>Login</span>
            </button>
        );
    }


    function Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
            return <UserGreeting />;
        }
        return <GuestGreeting />;
    }

    return (
        <div>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="https://img.icons8.com/clouds/60/ffffff/school.png" alt="school-icon" />
                        Al-Hashimiya School</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/teachers">Teachres</Nav.Link>
                            <NavDropdown title="More" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/admissions">Admissions</NavDropdown.Item>
                                <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
                                <NavDropdown.Item href="/contact">Contact Us</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Greeting isLoggedIn={isLogged()} />

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}