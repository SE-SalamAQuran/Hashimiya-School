import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import img1 from "./styles/images/Class.jpeg";
import img2 from "./styles/images/Yard.png";
import img3 from "./styles/images/lecture.jpg";
import img4 from "./styles/images/lecture2.jpg";
import DescCard from './DescCard';

export default function Description() {
    return (
        <div id="about" style={{ marginTop: "8px" }}>
            <Container>
                <Row>
                    <Col sm={6}>
                        <DescCard img={img1} title="Innovation" text="We want out students to be innovative and great" />
                    </Col>
                    <Col sm={6}>
                        <DescCard img={img2} title="Clean Yard" text="We provide the best for our students" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <DescCard img={img3} title="Visits" text="The process is being monitored by the Ministry of education &amp; higher education" />

                    </Col>
                    <Col sm={6}>
                        <DescCard img={img4} title="Meetings" text="We always lecture our students in various topics" />

                    </Col>

                </Row>
            </Container>

        </div>
    )
}
