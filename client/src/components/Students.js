import { React, useEffect, useState } from 'react';
import UserCard from './UserCard';
import { Container, Row, Col } from "react-bootstrap";
import StudentDetails from "./StudentDetails";

export default function Students() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/students/all")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [])
    return (
        <div>
            {data.map((character) => {
                return (
                    <div>
                        <Container>
                            <Row style={{ marginTop: "1em" }}>
                                <Col sm={6}>
                                    <UserCard name={character._id} title={character.name} body={character.gpa} img={character.avatar} details={<StudentDetails />} />
                                </Col>

                            </Row>
                        </Container>
                    </div>)
            })}
        </div>
    )
}
