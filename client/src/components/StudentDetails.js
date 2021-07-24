import { React, useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function StudentDetails(props) {
    function handleDetailsClick() {
        window.localStorage.setItem("id", props.name);

    }
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [parentsPhone, setParentsPhone] = useState("");
    const [grade, setGrade] = useState("");
    const [section, setSection] = useState("");
    const [dob, setDOB] = useState("");

    const student = localStorage.getItem("id");
    useEffect(() => {
        axios.get("http://localhost:5000/students/student/" + student, {
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => {
                console.log(res.data);
                setEmail(res.data[0].email);
                setAddress(res.data[0].address);
                setGrade(res.data[0].grade);
                setSection(res.data[0].section);
                setDOB(res.data[0].dateOfBirth);
                setParentsPhone(res.data[0].parentsPhone);
            })

            .catch((err) => console.log(err));
    }, [dob, student]);

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
    return (
        <div>
            <div>
                <Container>
                    <Row>
                        <Col sm={6}>
                            Age:
                        </Col>
                        <Col sm={6}>
                            {getAge(dob)}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            Email:
                        </Col>
                        <Col sm={6}>
                            {email}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            Address:
                        </Col>
                        <Col sm={6}>
                            {address}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            Grade:
                        </Col>
                        <Col sm={6}>
                            {grade}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            Section:
                        </Col>
                        <Col sm={6}>
                            {section}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            Parents Phone:
                        </Col>
                        <Col sm={6}>
                            {parentsPhone}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
