import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import { hacerSolicitud } from "../config/Spotify.jsx";
import Card from "../Components/Card.jsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import {UserContext} from "../Context/UserProvider.jsx";
import {FavoriteListContext} from "../Context/FavoriteListProvider.jsx";
import "../sass/components/_list_music.scss"
import "../sass/components/item_track.scss"

const Album = () => {
    const [infoAlbum, setInfoAlbum] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const {favoriteAlbums,toggleFavorite} = useContext(FavoriteListContext);

    useEffect(() => {
        if (id) {
            getAlbumInfo(id).then(setInfoAlbum).catch(error => console.error(error));
        } else {
            navigate('/');
        }
    }, [id]);

    if (!infoAlbum) {
        return <p>Cargando información del álbum...</p>; // Loading state
    }

    const onSubmit = ({ message }, { setSubmitting, setErrors, resetForm }) => {
        try {
            console.log(message);
            resetForm();
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setErrors({ credentials: "Credenciales inválidas" });
            } else {
                console.error(error.code, error.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        message: Yup.string().trim().min(3, "Mínimo 3 caracteres").required("Se requiere algo de contenido"),
    });

    const { name, images, artists, release_date, tracks } = infoAlbum;

    return (
        <main>
            <section className="album-info"> {/* Info básica */}
                <article>
                    {images && images.length > 0 && (
                        <img src={images[1]?.url} alt={`${name} album cover`}/>
                    )}
                    <div>
                        <h1>{name}</h1>
                        <p>
                            Artista(s): {artists.map((artist, index) => (
                            <span key={artist.id}>
                                <a href={`/artist?id=${artist.id}&name=${artist.name}`}>{artist.name}</a>
                                {index < artists.length - 1 && ", "}
                            </span>
                        ))}
                        </p>
                        <p>Fecha de lanzamiento: {release_date}</p>
                        <p>Canciones totales: {tracks.total}</p>
                        <a
                            className="favorite-icon"
                            onClick={() => {
                                if (user) {
                                    const artist = {
                                        id,
                                        name,
                                        image: images[1]?.url,
                                        type: "album"
                                    };
                                    toggleFavorite("album", artist);
                                } else {
                                    navigate(`/sign_in`);
                                }
                            }}
                        >
                            {favoriteAlbums.some(fav => fav.id === id) ?
                                <FontAwesomeIcon icon="fa-solid fa-heart"/> :
                                <FontAwesomeIcon icon={faHeart}/>}
                        </a>
                    </div>
                </article>
            </section>
            <section>
                <article>
                    <iframe
                        style={{borderRadius: '12px'}}
                        src={`https://open.spotify.com/embed/album/${id}?utm_source=generator`}
                        width="50%"
                        height="152"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </article>
            </section>

            <section className={"list-music"}>
                <h1>Canciones</h1>
                {tracks.items.map((track) => { // Cambié 'tracks' a 'tracks.items'
                    const {id, name, type} = track;

                    const imageUrl = images && images.length > 1 ? images[1]?.url : ''; // Manejo seguro de la imagen

                    return (
                        <Card
                            key={id} // Añadido key para evitar advertencias en consola
                            id={id}
                            name={name}
                            image={imageUrl}
                            typeOfMusic={type}
                        />
                    );
                })}
            </section>

            <section>
                <Formik
                    initialValues={{message: ""}}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({values, handleChange, handleBlur, handleSubmit, isSubmitting, errors}) => (
                        <Form onSubmit={handleSubmit}>
                            <Field
                                as="textarea"
                                id={"message"}
                                name={"message"}
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage component="div" name="message" style={{ color: 'red' }} />
                            <button type="submit" disabled={isSubmitting}>Enviar</button>
                        </Form>
                    )}
                </Formik>
            </section>
        </main>
    );
};

const getAlbumInfo = async (id) => {
    try {
        return await hacerSolicitud(`https://api.spotify.com/v1/albums/${id}`);
    } catch (error) {
        console.log("Error al obtener la información del álbum", error);
        throw error;
    }
}

export default Album;
