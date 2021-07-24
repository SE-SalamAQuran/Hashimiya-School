import React from 'react'
import AppBar from './AppBar'
import MainSlides from "./MainSlides";
import Description from "./Description";
import Footer from './Footer';
import AdminBar from './AdminBar';
export default function Main() {
    function isLogged() {
        return JSON.parse(sessionStorage.getItem("user")) == null ? false : true;
    }
    let user = JSON.parse(sessionStorage.getItem("user"));

    return (
        <div>
            {isLogged() && user.isAdmin === true ? <AdminBar /> : <AppBar />}

            <MainSlides />

            <Description />
            <Footer />
        </div>
    )
}
