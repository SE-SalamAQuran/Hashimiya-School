import { React, useState } from 'react';
import { Offcanvas, Button } from "react-bootstrap";

export default function CanvasMenu(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>


            <Button variant={props.variant} onClick={handleShow}>
                {props.button}
            </Button>

            <Offcanvas placement={props.placement} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {props.body}
                </Offcanvas.Body>
            </Offcanvas>



        </div>
    )
}
