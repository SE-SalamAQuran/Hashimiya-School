import { React, useState, useEffect } from 'react';
import { Form, Button, Toast, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function AlertForm() {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });
    const [title, setTitle] = useState("");
    const [alertClass, setAlertClass] = useState("");
    const [cause, setCause] = useState("");
    const [student, setStudent] = useState("");
    const [parentsCalled, setParentsCalled] = useState(false);

    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/students/all")
            .then((res) => { setStudents(res.data) })
            .catch((err) => console.error(err))
    }, []);

    function changeTitle(e) {
        setTitle(e.target.value);
    }
    function changeAlertClass(e) {
        setAlertClass(e.target.value);
    }
    function changeCause(e) {
        setCause(e.target.value);
    }
    function changeStudent(e) {
        setStudent(e.target.value)
    }
    function changeParentsCalled(e) {
        setParentsCalled(!parentsCalled);
    }



    function handleSubmit(e) {
        e.preventDefault();
        const alert = {
            title: title,
            cause: cause,
            student: student,
            alertClass: alertClass,
            parentsCalled: parentsCalled
        };
        axios.post("http://localhost:5000/alerts/new", alert)
            .then((res) => {
                console.log(res)
                setMessage({
                    type: "alert alert-success",
                    header: "Success",
                    text: "Added alert successfully",
                });
                setShow(true);
            })
            .catch((err) => {
                console.error(err)
                setMessage({
                    type: "alert alert-danger",
                    header: "Error",
                    text: "Error adding alert, please check the inputs",
                });
                setShow(true);
            })
    }
    return (
        <div style={{ textAlign: "center" }}>
            <Form onSubmit={handleSubmit}>

                <Form.Control onChange={changeTitle} style={{ marginTop: "1rem", textAlign: "center" }} name="title" value={title} type="text" placeholder="Alert Title" />
                <Form.Control onChange={changeCause} style={{ marginTop: "1rem", textAlign: "center" }} name="cause" value={cause} type="text" placeholder="Alert Cause" />

                <Form.Select onChange={changeAlertClass} style={{ marginTop: "1rem" }} name="alertClass" value={alertClass} aria-label="Select Alert Class">
                    <option>Alert Class</option>
                    <option value="Warning">Warning</option>
                    <option value="Alert">Alert</option>
                    <option value="Dismissal">Dismissal</option>
                </Form.Select>
                <Form.Select onChange={changeStudent} style={{ marginTop: "1rem" }} name="student" value={student} aria-label="Select Alert Class">
                    <option>Student Name</option>
                    {students.map((std) => (
                        <option value={std._id}>{std.name}</option>
                    ))}
                </Form.Select>
                <Form.Group style={{ marginTop: "1rem" }} className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onChange={changeParentsCalled} type="checkbox" name="parentsCalled" value={parentsCalled} label="Parents Called ?" />
                </Form.Group>
                <div style={{ margin: "auto", padding: "10px", width: "50%" }}>
                    <Button type="submit" variant="outline-success">Add Alert</Button>
                </div>
            </Form>
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
