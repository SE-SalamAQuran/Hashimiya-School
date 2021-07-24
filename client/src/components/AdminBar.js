import React from 'react';
import CanvasMenu from './CanvasMenu';
import { Navbar, Container, Nav } from "react-bootstrap";
import AllStudentsAlerts from './AllStudentsAlerts';

export default function AdminBar() {
    function logOut(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location = "/";
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
    return (
        <div>
            <Navbar bg="dark" fixed="top" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="https://img.icons8.com/clouds/60/ffffff/school.png" alt="school-icon" />
                        Al-Hashimiya School</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/grades">Grades</Nav.Link>
                        <Nav.Link href="/periods">Periods</Nav.Link>
                        <Nav.Link href="/students">Students</Nav.Link>
                        <Nav.Link href="/teachers">Teachers</Nav.Link>
                    </Nav>
                    <CanvasMenu variant="outline-danger" button="Show Alerts" title="Student Alerts" body={<AllStudentsAlerts />} placement="end" />
                </Container>
                <button
                    onClick={logOut}
                    style={{ marginRight: "7px" }}
                    type="button"
                    class="btn btn-sm btn-outline-danger"
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
            </Navbar>

        </div>
    )
}
