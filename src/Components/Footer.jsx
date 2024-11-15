import React from 'react';
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <NavLink to={"/contact_me"}>Contactar</NavLink>
        </footer>
    );
};

export default Footer;