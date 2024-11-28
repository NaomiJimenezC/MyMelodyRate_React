import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {logOut} from "../config/Firebase.jsx";
import {UserContext} from "../Context/UserProvider.jsx";

const Header = () => {
    const {user, setUser} = useContext(UserContext)

    const handleLogout = async()=> {
        await logOut()
        setUser(false)
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-mi-color text-descriptivo w-100 container-fluid ">
                    <a className="navbar-brand" href="/">
                        <img className={"img-sin-fondo"} src={"src/assets/mYmelody rate.svg"} alt={"Logo"} />
                    </a>
                    <select></select>
                    <input
                        className="form-control me-2 bg-input"
                        type="search"
                        placeholder="Busca un artista, álbum, canción..."
                        aria-label="Search"
                    />
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            {user ? (
                                <>
                                    <NavLink className={"nav-link text-white"} onClick={handleLogout}>Cerrar Sesión</NavLink>
                                    <NavLink className="nav-link text-white" to="/user">Perfil</NavLink>
                                </>
                                ):
                                <>
                                    <NavLink className="nav-link text-white" to="/sign_in">Inicio de sesión</NavLink>
                                </>

                            }

                        </li>
                    </ul>
            </nav>
        </header>
    );
};

export default Header;