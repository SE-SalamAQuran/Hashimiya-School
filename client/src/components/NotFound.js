import React from 'react'
import myStyle from "./styles/Nav.module.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function NotFound() {
    function onClick() {
        window.location = "/";
    }

    return (
        <div style={{ textAlign: "center", margin: "1rem" }}>
            <h1>404 - Not Found!</h1>
            <h3>The page you're looking for is not found</h3>

            <img
                className={myStyle.box}
                src="https://img.icons8.com/bubbles/150/000000/school.png"
                alt="school"
            />
            <br></br>

            <button onClick={onClick} className="btn btn-outline-dark btn-md">
                Go Back
            </button>

        </div>
    )
}
