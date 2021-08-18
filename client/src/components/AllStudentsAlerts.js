import { React, useState, useEffect } from 'react';
import AccordionItems from './AccordionItems';
import { Badge, Container, Row, Col, Button } from "react-bootstrap";
import CanvasMenu from './CanvasMenu';
import AlertForm from './AlertForm';
export default function AllStudentsAlerts() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/alerts/all")
            .then((res) => res.json())
            .then((data) => setData(data));

    }, []);


    return (
        <div>
            <div style={{ margin: "auto", width: "50%", padding: "10px" }}>
                <CanvasMenu placement="start" variant="outline-danger" button="Add a new Alert" backdrop={false} scroll={false} title="New Alert" body={<AlertForm />} />
            </div>
            {data.map((character) => {


                return (
                    <div>
                        <AccordionItems

                            name={character._id}
                            title={character.student.name}
                            body={
                                <div>
                                    <Container >
                                        <Row style={{ marginTop: "2rem" }}>
                                            <Col sm={6}>
                                                Title:
                                            </Col>
                                            <Col sm={6}>
                                                {character.title}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "2rem" }}>
                                            <Col sm={6}>
                                                Status:
                                            </Col>

                                            <Col sm={6}>

                                                <Badge
                                                    pill
                                                    bg={
                                                        character.alertClass === "Warning" ? "warning"
                                                            : character.alertClass === "Alert" ? "danger"
                                                                : "dark"}
                                                    text={(character.alertClass === "Dismissal") ? "light" : "dark"}
                                                >
                                                    {character.alertClass}
                                                </Badge>{' '}

                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "2rem" }}>
                                            <Col sm={6}>
                                                Cause:
                                            </Col>
                                            <Col sm={6}>
                                                {character.cause}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "2rem" }}>
                                            <Col sm={6}>
                                                Parents Called?
                                            </Col>
                                            <Col sm={6}>
                                                {character.parentsCalled ? "Yes" : "No"}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "2rem" }}>
                                            <Col sm={6}>
                                                Call Parents
                                            </Col>
                                            <Col sm={6}>
                                                <Button disabled={character.parentsCalled} variant="info">
                                                    <a target="_blank" rel="noreferrer" href={"tel:" + character.student.parentsPhone}>
                                                        <img src="https://img.icons8.com/office/20/000000/phone.png" alt="phone-icon" />
                                                    </a>
                                                </Button>

                                            </Col>
                                        </Row>
                                    </Container>


                                </div>
                            }
                        />
                    </div>);
            })}
        </div>
    )
}
