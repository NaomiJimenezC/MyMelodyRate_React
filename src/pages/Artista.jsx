import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {hacerSolicitud} from "../config/Spotify.jsx";
import Card from "../Components/Card.jsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {UserContext} from "../Context/UserProvider.jsx";
import {FavoriteListContext} from "../Context/FavoriteListProviders.jsx";
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Artista = () => {
    const [infoArtist, setInfoArtist] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [artistAlbum, setArtistAlbum] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const nameArtist = queryParams.get('name');

    const {user} = useContext(UserContext);
    const {favoriteArtist,toggleFavorite} = useContext(FavoriteListContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (id) {
            getArtistInfo(id).then(setInfoArtist).catch(error => console.error(error));
            getArtistAlbum(nameArtist).then(r => setArtistAlbum(r.albums.items)).catch(error => console.log(error));
            getArtistTopTrack(nameArtist,id).then(r=>setTopTracks(r)).catch(error => console.error(error));
        } else {
            navigate('/');
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
    console.log(artistAlbum);
    return (
        <main>
            <section>
                <article>
                    <img src={infoArtist.images[1].url} alt={infoArtist.name} />
                    <h1>{infoArtist.name}</h1>
                    <p>Género(s): {infoArtist.genres.map((gender)=> gender).join(", ")}</p>
                    <a href={infoArtist.external_urls["spotify"]}>Perfil de Spotify</a>
                    <a onClick={()=>{
                        if (user) {
                            const artist = {
                                id,
                                name: nameArtist,
                                image: infoArtist.images[1].url,
                                type: infoArtist.type };
                            toggleFavorite("artist",artist)
                        } else {
                            navigate(`/sign_in`);
                        }

                    }}>
                        {favoriteArtist.some(fav => fav.id === id) ? <FontAwesomeIcon icon="fa-solid fa-heart"/> :
                            <FontAwesomeIcon icon={faHeart} />}
                    </a>
                </article>
            </section>
            <section>
                <h2>Canción más populares</h2>
                {topTracks?.slice(0,5).map((track) => {
                    const {id, name, type, album} = track
                    return (
                        <Card
                            key={id}
                            id={id}
                            name={name}
                            image={album.images[1].url}
                            typeOfMusic={type}
                        />
                    )
                })}
            </section>
            <section>
                <h2>Álbumnes</h2>
                {artistAlbum?.map((album) => {
                    const {id, name, type, images} = album
                    return (
                        <Card
                            key={id}
                            id={id}
                            name={name}
                            image={images[1].url}
                            typeOfMusic={type}
                        />
                    )
                })}
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

const getArtistAlbum = async (name) => {
    try {
        const nameParsed= (name.includes(" ")) ? name.replace(" ", "+") : name;
        return await hacerSolicitud(`https://api.spotify.com/v1/search?q=artist%3A${nameParsed}&type=album&limit=5&offset=0`);
    } catch (error) {
        console.error("Error al obtener las canciones");
        throw error;
    }
};


const getArtistTopTrack = async (name,artistId) => {
    try {
        const nameParsed= (name.includes(" ")) ? name.replace(" ", "+") : name;
        const artistTracks = await hacerSolicitud(`https://api.spotify.com/v1/search?q=artist%3A${nameParsed}&type=track&limit=25&offset=0`);

        return artistTracks.tracks.items
            .filter(track => track.artists.some(artist => artist.id === artistId))
            .sort((a, b) => b.popularity - a.popularity);

    } catch (error) {
        console.error("Error al obtener las canciones");
        throw error;
    }
};

export default Artista;