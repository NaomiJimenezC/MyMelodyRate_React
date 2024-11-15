import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header>

            <ul>
                <img src={"src/assets/mYmelody rate.svg"} alt={"Logo"} style={{height: "85px"}}/>
                <input placeholder={"Busca un artista,album,cancion..."}/>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </ul>
        </header>
    );
};

export default Header;