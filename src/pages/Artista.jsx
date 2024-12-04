import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {hacerSolicitud} from "../config/Spotify.jsx";
import ListMusic from "../Components/ListMusic.jsx";
import Card from "../Components/Card.jsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

const Artista = () => {
    const [infoArtist, setInfoArtist] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [artistAlbum, setArtistAlbum] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');



    useEffect(() => {
        if (id) {
            getArtistInfo(id).then(setInfoArtist).catch(error => console.error(error));
            getArtistAlbum(id).then(setArtistAlbum).catch(error => console.error(error));
            getArtistTopTrack(id).then(setTopTracks).catch(error => console.error(error));
        }
    }, [id]);

    if (!infoArtist) {
        return <p>Cargando información del artista...</p>; // Loading state
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
        }//TODO(CAMBIAR)
    };

    const validationSchema = Yup.object().shape({
        message: Yup.string().trim().min(3, "Mínimo 3 caracteres").required("Se requiere algo de contenido"),
    });
    console.log(topTracks);
    console.log(artistAlbum);
    return (
        <main>
            <section>
                <article>
                    <img src={infoArtist.images[1].url} alt={infoArtist.name} />
                    <h1>{infoArtist.name}</h1>
                    <p>Género(s): {infoArtist.genres.map((gender)=> gender).join(", ")}</p>
                    <a href={infoArtist.external_urls["spotify"]}>Perfil de Spotify</a>
                </article>
            </section>
            <section>
                {/*<h2>Canción más populares</h2>*/}
                {/*{topTracks.tracks.map((track) => {*/}
                {/*    const {id, name, type, album} = track*/}
                {/*    return (*/}
                {/*        <Card*/}
                {/*            key={id}*/}
                {/*            id={id}*/}
                {/*            name={name}*/}
                {/*            image={album.images[1].url}*/}
                {/*            typeOfMusic={type}*/}
                {/*        />*/}
                {/*    )*/}
                {/*})}*/}
            </section>
            <section>
                {/*<h2>Álbumnes</h2>*/}
                {/*{artistAlbum.items.map((album) => {*/}
                {/*    const {id, name, type, images} = album*/}
                {/*    return (*/}
                {/*        <Card*/}
                {/*            key={id}*/}
                {/*            id={id}*/}
                {/*            name={name}*/}
                {/*            image={images[1].url}*/}
                {/*            typeOfMusic={type}*/}
                {/*        />*/}
                {/*    )*/}
                {/*})}*/}
            </section>
            <section>
                <Formik
                    initialValues={{ message: "" }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({ values,
                          handleChange
                          , handleBlur,
                          handleSubmit,
                          isSubmitting }) => (
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

const getArtistInfo = async (id) => {
    try {
        return await hacerSolicitud(`https://api.spotify.com/v1/artists/${id}`);
    } catch (error) {
        console.log("Error al obtener la información del álbum", error);
        throw error;
    }
}

const getArtistTopTrack = async (id) => {
    try {
        return await hacerSolicitud(`https://api.spotify.com/v1/artists/${id}/top-tracks`);
    } catch (error) {
        console.log("Error al obtener la información del álbum", error);
        throw error;
    }
}

const getArtistAlbum = async (id) => {
    try {
        return await hacerSolicitud(`https://api.spotify.com/v1/artists/${id}/albums`);
    } catch (error) {
        console.log("Error al obtener la información del álbum", error);
        throw error;
    }
}

export default Artista;