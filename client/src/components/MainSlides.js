import React from 'react';

import styles from "./styles/Nav.module.css";
export default function MainSlides() {
    return (
        <div id="head">
            <section id={styles.hero}>
                <div className={styles.containerTop}>
                    <h1>Invest in your son's future</h1>
                    <br></br>
                    <h1>Don't think or guess</h1>
                </div>
                <div className={styles.heroContainer}>
                    <h1>Al-Hashimiya School</h1>
                    <br></br>
                    <h2>The future of the palestinian youth</h2>
                    <br></br>
                    <a href="#about" className={styles.btnScroll} title="Go Down">
                        Find Out More
                    </a>
                </div>
            </section>
        </div>
    )
}
