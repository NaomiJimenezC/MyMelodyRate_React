import React, { useContext, useState } from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import { logOut } from "../config/Firebase.jsx";
import { UserContext } from "../Context/UserProvider.jsx";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import "../sass/components/_header.scss"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faHouse, faUser);





const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        setUser(false);
    };

    const validationSchema = Yup.object().shape({
        searchTerm: Yup.string().trim().min(1, "Mínimo 3 caracteres").required("Se requiere escribir algo"),
        // Validación para que no esté vacío
    });


    return (
        <header className="header">
            <nav className="header__nav">
                <a href="/" className="header__logo-link">
                    <img className="header__logo" src="src/assets/mYmelody rate.svg" alt="Logo"/>
                </a>
                <Formik
                    initialValues={{searchTerm: '', selectedOption: 'artist'}} // Valores iniciales
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        // Redirigir a la página de resultados con los valores seleccionados
                        navigate(`/results?type=${values.selectedOption}&query=${values.searchTerm}`);
                    }}
                >
                    {(    {values,
                          handleChange,
                          handleBlur,
                          isSubmitting}
                     ) => (
                        <Form className="header__search-form"> {/* Formulario para manejar búsqueda */}
                            <Field
                                as="select"
                                id="selectedOption"
                                name="selectedOption"
                                className="header__search-select"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.selectedOption}
                            >
                                {/* Opción por defecto */}
                                <option value="artist">Artista</option>
                                <option value="album">Álbum</option>
                                <option value="track">Canción</option>
                                <option value="Todo">Todo</option>
                            </Field>

                            <Field
                                name="searchTerm"
                                className="header__search-input"
                                type="search"
                                placeholder="Busca un artista, álbum, canción..."
                                aria-label="Search"
                            />
                            <ErrorMessage name="searchTerm" component="div" className="header__search-error"/>
                            <button type="submit" className="header__search-button" disabled={isSubmitting}>
                                Buscar
                            </button>
                        </Form>
                    )}
                </Formik>
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        {user ? (
                            <>
                                <FontAwesomeIcon className={"nav-link"} icon={faRightFromBracket} onClick={handleLogout} />
                                <FontAwesomeIcon className={"nav-link"} icon={faUser} onClick={() => navigate("/user")} />

                            </>
                        ) : (

                            <FontAwesomeIcon icon={faRightFromBracket} onClick={() => navigate("/sign_in")} />
                        )}
                    </li>
                </ul>
            </nav>
        </header>

    );
};

export default Header;
