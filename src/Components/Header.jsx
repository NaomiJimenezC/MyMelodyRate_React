import React, { useContext, useState } from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import { logOut } from "../config/Firebase.jsx";
import { UserContext } from "../Context/UserProvider.jsx";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const [selectedOption, setSelectedOption] = useState("Artista"); // Estado para la opción seleccionada

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        setUser(false);
    };

    const validationSchema = Yup.object().shape({
        searchTerm: Yup.string().trim().min(1, "Mínimo 3 caracteres").required("Se requiere escribir algo"),
        // Validación para que no esté vacío
    });

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value); // Actualiza el estado con la opción seleccionada
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-mi-color text-descriptivo w-100 container-fluid">
                <a className="navbar-brand" href="/">
                    <img className={"img-sin-fondo"} src={"src/assets/mYmelody rate.svg"} alt={"Logo"} style={{ width: '200px' }} />
                </a>
                <Formik
                    initialValues={{ searchTerm: '', selectedOption: 'track' }} // Valores iniciales
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        // Redirigir a la página de resultados con los valores seleccionados
                        navigate(`/results?type=${values.selectedOption}&query=${values.searchTerm}`);
                    }}
                >
                    {() => (
                        <Form className="d-flex"> {/* Formulario para manejar búsqueda */}
                            <select onChange={handleSelectChange}>
                                <option value="artist">Artista</option>
                                <option value="album">Álbum</option>
                                <option value="track">Canción</option>
                                <option value="Todo">Todo</option>
                            </select>
                            <Field
                                name="searchTerm"
                                className="form-control me-2 bg-input"
                                type="search"
                                placeholder="Busca un artista, álbum, canción..."
                                aria-label="Search"
                            />
                            <ErrorMessage name="searchTerm" component="div" style={{ color: 'red' }} /> {/* Mensaje de error */}
                            <button type="submit" className="btn btn-outline-success">Buscar</button> {/* Botón para enviar búsqueda */}
                        </Form>
                    )}
                </Formik>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        {user ? (
                            <>
                                <NavLink className={"nav-link text-white"} onClick={handleLogout}>Cerrar Sesión</NavLink>
                                <NavLink className="nav-link text-white" to="/user">Perfil</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className="nav-link text-white" to="/sign_in">Inicio de sesión</NavLink>
                            </>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
