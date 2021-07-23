import React from 'react'
import AppBar from './AppBar'
import MainSlides from "./MainSlides";
import Description from "./Description";
import Footer from './Footer';
export default function Main() {
    return (
        <div>
            <AppBar />

            <MainSlides />

            <Description />
            <Footer />
        </div>
    )
}
