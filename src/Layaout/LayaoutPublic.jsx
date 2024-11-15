import React from 'react';
import Header from "../Components/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../Components/Footer.jsx";

const LayaoutPublic = () => {
    return (
        <>
            <Header />
                <Outlet />
            <Footer />
        </>
    );
};

export default LayaoutPublic;