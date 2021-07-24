import { React, useState } from 'react';
import { Accordion, Button, Row, Col, Toast } from 'react-bootstrap';
import axios from "axios";

export default function AccordionItems(props) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });

    // eslint-disable-next-line no-unused-vars


    function handleDelete() {
        window.localStorage.setItem("id", props.name);
        const alert = localStorage.getItem("id");
        const admin = user._id;
        axios.delete("http://localhost:5000/alerts/alert/" + alert + "/" + admin)
            .then((res) => {
                setMessage({
                    type: "alert alert-warning",
                    header: "Deleted",
                    text: "Item deleted successfully",
                });
                setShow(true);
                console.log(res);

            })
            .catch((err) => {
                //handle error
                setMessage({
                    type: "alert alert-danger",
                    header: "Failed",
                    text: "Failed to delete item",
                });
                setShow(true);
                console.log(err);

            });
    }

    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{props.title}</Accordion.Header>
                    <Accordion.Body>
                        {props.body}
                    </Accordion.Body>
                    <div style={{ margin: "auto", padding: "10px", width: "50%" }}>
                        <Button onClick={handleDelete} variant="danger">{props.button}Delete Alert</Button>
                    </div>
                </Accordion.Item>

            </Accordion>
            <Row>
                <Col xs={12}>
                    <Toast
                        onClose={() => setShow(false)}
                        show={show}
                        style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                        delay={3000}
                        autohide
                    >
                        <div className={message.type}>
                            <strong className="mr-auto">{message.header}</strong>
                            <br></br>
                            <small>{message.text}</small>
                        </div>
                    </Toast>
                </Col>
            </Row>
        </div>
    )
}
