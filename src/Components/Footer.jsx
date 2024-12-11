import React from 'react';
import {NavLink} from "react-router-dom";
import "../sass/components/_footer.scss"

const Footer = () => {
    return (
        <footer className="footer">
            <nav className="navbar navbar-expand-lg bg-mi-color text-descriptivo w-100">
                <NavLink to={"/contact_me"}>Contactar</NavLink>
            </nav>

        </footer>
    );
};

export default Footer;

