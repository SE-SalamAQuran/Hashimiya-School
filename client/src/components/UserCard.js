import React from 'react';
import { Card } from "react-bootstrap";

export default function UserCard(props) {

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img style={{ width: "50%", borderRadius: "50%", display: "block", marginLeft: "auto", marginRight: "auto" }} variant="top" src={props.img} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.body}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
