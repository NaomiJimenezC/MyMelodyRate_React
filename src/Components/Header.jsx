import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-mi-color text-descriptivo w-100">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img className={"img-sin-fondo"} src={"src/assets/mYmelody rate.svg"} alt={"Logo"} style={{height: "100px"}}/>
                    </a>
                    <input
                        className="form-control me-2 bg-input"
                        type="search"
                        placeholder="Busca un artista, álbum, canción..."
                        aria-label="Search"
                    />
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/contact_me">Contactar</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;