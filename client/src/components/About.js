import React from 'react';
import AppBar from './AppBar';
import Footer from './Footer';
import how from "../images/classroom.jpg"
import who from "../images/school.jpg"

export default function About() {
    return (
        <div className="about">
            <AppBar />

            <div class="container">
                <div class="row align-items-center my-5">
                    <div style={{ marginBottom: "5rem" }} class="col-lg-6">
                        <img
                            class="img-fluid rounded mb-4 mb-lg-0"
                            src={who}
                            alt="real-estates"
                        />
                    </div>
                    <div
                        style={{ marginBottom: "5rem", textAlign: "center" }}
                        class="col-lg-6"
                    >
                        <h1 class="font-Dark-light">About us </h1>

                        <p>
                            Our school is a goverment educational organization which aims to develop and produce a generation of young men ready & able to build the future of out beloved country Palestine.
                        </p>
                    </div>
                    <div class="col-lg-6">
                        <img
                            class="img-fluid rounded mb-4 mb-lg-0"
                            src={how}
                            alt="about-school"
                        />
                    </div>
                    <div class="col-lg-6">
                        <h1 class="font-Dark-light">How we do it ?</h1>

                        <p style={{ textAlign: "left", padding: "1rem" }}>
                            <ol>
                                <li>
                                    Providing a nice and decent studying environment for all students.
                                </li>{" "}
                                <li>
                                    Coordinate with Union committees to visit our school to give the students a better look at the future of the job market.
                                </li>
                                <li>
                                    Get students envolved in community work.
                                </li>
                                <li>
                                    Giving our students lectures about morals and when to be careful.
                                </li>
                                <li>
                                    If you wish to contact one of the admins directly, you can
                                    find the list of admins in the{" "}
                                    <a href="/contact">Contact page</a>.
                                    Or you can contact us via one of the methods below.
                                </li>
                                <img src="https://img.icons8.com/office/16/000000/expand-arrow--v2.png" alt="sads" />

                            </ol>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
