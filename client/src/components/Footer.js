import React from 'react';
import styles from "./styles/Footer.module.css";
import { Card } from "react-bootstrap";
export default function Footer() {

    function clickHandler() {
        window.location = "/";
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            <Card border="light" className="bg-light" style={{ width: '100%' }}>
                <Card.Header>Get in touch</Card.Header>
                <Card.Body>

                    <Card.Text>
                        <a target="_blank" rel="noreferrer" href="https://ar-ar.facebook.com/pages/category/Education/%D8%A7%D9%84%D9%85%D8%AF%D8%B1%D8%B3%D8%A9-%D8%A7%D9%84%D9%87%D8%A7%D8%B4%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%D8%A9-%D9%84%D9%84%D8%A8%D9%86%D9%8A%D9%86-180691508643946/">
                            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="fb-icon" />
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://www.waze.com/ar/live-map/directions/%D8%A7%D9%84%D9%85%D8%AF%D8%B1%D8%B3%D8%A9-%D8%A7%D9%84%D9%87%D8%A7%D8%B4%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%D8%A9-%D9%84%D9%84%D8%A8%D9%86%D9%8A%D9%86-al-bireh-%D8%A7%D9%84%D8%A8%D9%8A%D8%B1%D8%A9?to=place.w.23068991.230820983.417891">
                            <img src="https://img.icons8.com/dusk/48/000000/waze.png" alt="waze-icon" />
                        </a>
                        <a target="_blank" rel="noreferrer" href="tel:+97‏02-2401261">
                            <img src="https://img.icons8.com/office/48/000000/phone.png" alt="phone-icon" />
                        </a>

                    </Card.Text>

                    <Card.Text>
                        Copyrights @ Al-Hashimiya Boys School {new Date().getFullYear()}
                        <a href="#head">
                            <img

                                src="https://img.icons8.com/emoji/48/000000/school-emoji.png"
                                alt="logo"
                                className={styles.logo}
                            />
                        </a>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />

            <footer className={styles.footer}>
                <p onClick={clickHandler}>



                </p>
            </footer>
        </div >
    )
}
