import { React, useEffect, useState } from 'react';
import AppBar from './AppBar';
import "./styles/Profile.module.css";
import axios from "axios";
import { Image } from "react-bootstrap";

export default function StudentProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gpa, setGPA] = useState(0.0);
    const [grade, setGrade] = useState("");
    const [section, setSection] = useState("");
    const [dob, setDOB] = useState("");
    const [age, setAge] = useState(0);
    const [avatar, setAvatar] = useState("");
    const [pic, setPic] = useState("");
    const [enrolled, setEnrolled] = useState(true);
    const [selectAbout, setSelectAbout] = useState(true);
    const [selectAcademic, setSelectAcademic] = useState(false);

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function handleAboutClick() {
        setSelectAcademic(false);
        setSelectAbout(true);
    }
    function handleAcademicClick() {
        setSelectAbout(false);
        setSelectAcademic(true);
    }

    function _imageEncode(arrayBuffer) {
        let b64encoded = btoa(
            [].reduce.call(
                new Uint8Array(arrayBuffer),
                function (p, c) {
                    return p + String.fromCharCode(c);
                },
                ""
            )
        );
        let mimetype = "image/jpeg";
        return "data:" + mimetype + ";base64," + b64encoded;
    }

    let user = JSON.parse(sessionStorage.getItem("user"));
    useEffect(() => {
        axios.get("http://localhost:5000/students/student/" + user._id, {
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => {
                console.log(res.data);
                setName(res.data[0].name);
                setEmail(res.data[0].email);
                setAddress(res.data[0].address);
                setGPA(res.data[0].gpa);
                setGrade(res.data[0].grade);
                setSection(res.data[0].section);
                setDOB(res.data[0].dateOfBirth);
                setPic(res.data[0].avatar);
                setAge(getAge(dob));
                setEnrolled(res.data[0].enrolled);
            })

            .catch((err) => console.log(err));

    })
    useEffect(() => {
        axios.get(pic, { responseType: "arraybuffer" }).then((res) => {
            setAvatar(_imageEncode(res.data));
        });
    });

    function Badge() {
        if (!enrolled) {
            return (<div>
                <h4>Graduated</h4>
                <img src="https://img.icons8.com/fluent/48/000000/student-center.png" alt="graduate" />
            </div>)
        }
        return (
            <div>
                <h4>Student</h4>
                <img src="https://img.icons8.com/color/48/000000/studying.png" alt="student" />
            </div>
        )
    }
    function About() {
        return (
            <div className="tab-content profile-tab" id="myTabContent">
                <div style={{ margin: "auto", padding: "10px", width: "50%" }} className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                    <div className="row">
                        <div className="col-md-6">
                            <label>Email</label>
                        </div>
                        <div className="col-md-6">
                            <p>{email}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label>Address</label>
                        </div>
                        <div className="col-md-6">
                            <p>{address}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Age</label>
                        </div>
                        <div className="col-md-6">
                            <p>{age}</p>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
    function Details() {
        return (
            <div className="tab-content profile-tab" id="myTabContent">
                <div style={{ margin: "auto", padding: "20px", width: "50%" }} className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                    <div className="row">
                        <div className="col-md-6">
                            <label>Grade</label>
                        </div>
                        <div className="col-md-6">
                            <p>{grade}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label>Section</label>
                        </div>
                        <div className="col-md-6">
                            <p>{section}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Enrolled ?</label>
                        </div>
                        <div className="col-md-6">
                            <Badge />
                        </div>
                    </div>
                </div>

            </div>

        )
    }
    return (
        <div>
            <AppBar />

            <div style={{ marginTop: "5rem" }} className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <Image style={{ width: "50%", borderRadius: "50%" }} srcSet={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {name}
                                </h5>

                                <p className="proile-rating">GPA : <span>{gpa}</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={handleAboutClick} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={handleAcademicClick} id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Academic</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-4">

                        </div>
                        <div className="col-md-8">
                            {(selectAbout && !selectAcademic) ? <About /> : <Details />}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
