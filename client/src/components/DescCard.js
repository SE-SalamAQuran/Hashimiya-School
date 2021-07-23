import React from 'react';
import { Card } from "react-bootstrap";


export default function DescCard(props) {
    return (
        <div style={{ marginTop: "1em" }}>
            <Card className="bg-success">
                <Card.Img src={props.img} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.text}
                    </Card.Text>

                </Card.ImgOverlay>
            </Card>
        </div>
    )
}
