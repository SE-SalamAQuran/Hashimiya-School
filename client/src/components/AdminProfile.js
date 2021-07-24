import { React, useEffect, useState } from 'react';
import AdminBar from './AdminBar';
import "./styles/Profile.module.css";
import axios from "axios";
import { Image } from "react-bootstrap";

export default function AdminProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [subject, setSubject] = useState("");
    const [salary, setSalary] = useState(0);
    const [avatar, setAvatar] = useState("");
    const [pic, setPic] = useState("");
    const [selectAbout, setSelectAbout] = useState(true);
    const [selectAcademic, setSelectAcademic] = useState(false);



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
        axios.get("http://localhost:5000/teachers/teacher/" + user._id, {
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => {
                console.log(res.data);
                setName(res.data[0].name);
                setEmail(res.data[0].email);
                setAddress(res.data[0].address);
                setSubject(res.data[0].subject);
                setSalary(res.data[0].salary);
                setPic(res.data[0].avatar);
                setPhone(res.data[0].phone);

            })

            .catch((err) => console.log(err));

    })
    useEffect(() => {
        axios.get(pic, { responseType: "arraybuffer" }).then((res) => {
            setAvatar(_imageEncode(res.data));
        });
    });


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
                            <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                            <p>{phone}</p>
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
                            <label>Salary</label>
                        </div>
                        <div className="col-md-6">
                            <p>{salary}</p>
                        </div>
                    </div>

                </div>

            </div>

        )
    }
    return (
        <div>
            <AdminBar />

            <div style={{ marginTop: "7rem" }} className="container emp-profile">
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

                                <p className="proile-rating">Subject : <span>{subject}</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={handleAboutClick} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={handleAcademicClick} id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Financial</a>
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
