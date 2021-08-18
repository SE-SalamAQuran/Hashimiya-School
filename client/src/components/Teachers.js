import { React, useState, useEffect } from 'react';
import UserCard from './UserCard';
import { Container, Row, Col, ButtonGroup, Dropdown, Button, DropdownButton } from 'react-bootstrap';

export default function Teachers() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/teachers/all")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [])

    function handleMainClick() {
        window.location = '/';
    }

    function handleAdmissionsClick() {
        window.location = '/admissions';
    }
    return (
        <div>
            {data.map((character) => {
                return (
                    <div>
                        <ButtonGroup style={{ marginTop: "1rem" }} className="mb-2">
                            <Button onClick={handleMainClick} variant="outline-dark">Main</Button>
                            <Button onClick={handleAdmissionsClick} variant="outline-success">Admissions</Button>
                            <DropdownButton variant="outline-danger" as={ButtonGroup} title="Other" id="bg-nested-dropdown">
                                <Dropdown.Item href='/about' eventKey="1">About Us</Dropdown.Item>
                                <Dropdown.Item href='/contact' eventKey="2">Contact Us</Dropdown.Item>
                            </DropdownButton>
                        </ButtonGroup>
                        <Container>
                            <Row style={{ marginTop: "1em" }}>
                                <Col sm={6}>
                                    <UserCard
                                        name={character._id}
                                        title={character.name}
                                        body={
                                            <div>

                                                Subject: {character.subject}
                                                <br></br>

                                                Address: {character.address}
                                                <br></br>

                                                Phone: {character.phone}
                                            </div>
                                        }
                                        img={character.avatar}


                                    />
                                </Col>

                            </Row>
                        </Container>
                    </div>)
            })}
        </div>
    )
}
