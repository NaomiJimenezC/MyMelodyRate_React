import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import { hacerSolicitud } from "../config/Spotify.jsx";
import Card from "../Components/Card.jsx";
import {UserContext} from "../Context/UserProvider.jsx";
import {FavoriteListContext} from "../Context/FavoriteListProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import "../sass/utilities/_variable.scss"

const Cancion = () => {
    const [infoTrack, setInfoTrack] = useState(null); // Initialize as null for better conditional rendering

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const {favoriteSongs,toggleFavorite} = useContext(FavoriteListContext);

    useEffect(() => {
        if (id) {
            getTrackInfo(id).then(setInfoTrack).catch(error => console.error(error));
        } else {
            navigate('/');
        }
    }, [id]);

    if (!infoTrack) {
        return <p>Cargando información de la canción...</p>; // Loading state
    }

    const {
        name,
        artists,
        duration_ms,
        album,
        external_urls,
    } = infoTrack;
    return (
        <main>
            <section className={"item-info"}>
                {album && album.images && album.images.length > 0 && (
                    <img src={album.images[1].url} className={"album-card__image"} alt={`${name} album cover`}/>
                )} {/*una nunca sabe cuando fiarse de que alguna comprobación falte*/}
                <h1 className={"album-card__tittle"}>{name}</h1>
                <p className={"album-card__description"}>Fecha de lanzamiento: {album.release_date}</p>

                <p className={"album-card__description"}>
                    Artista(s): {artists.map((artist, index) => (
                    <span key={artist.id}>
                         <a className={"album-card__link"} href={`/artist?id=${artist.id}&name=${artist.name}`}>
                        {artist.name}
                        </a>
                        {index < artists.length - 1 && ", "}
                     </span>
                ))}
                </p>

                <p className={"album-card__description"}>Duración: {(duration_ms / 60000).toFixed(2)} minutos</p>
                <a onClick={() => {
                    if (user) {
                        const artist = {
                            id,
                            name,
                            image: album.images[1].url,
                            type: "track"
                        };
                        toggleFavorite("song", artist)
                    } else {
                        navigate(`/sign_in`);
                    }

                }}>
                    {favoriteSongs.some(fav => fav.id === id) ? <FontAwesomeIcon icon="fa-solid fa-heart"/> :
                        <FontAwesomeIcon icon={faHeart}/>}
                </a>
                <a href={external_urls["spotify"]}>¡Escucha esta canción!</a>

            </section>
            <section>
                <iframe // sé que iframe puede ser una mala práctica, pero era necesario para mi web
                    src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=1`}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Embed: Track"
                />
            </section>
            <section>
                <h1>Se encuentra en el siguiente álbum:</h1>
                <Card
                    id={album.id}
                    name={album.name}
                    image={album.images[1].url}
                    typeOfMusic={album.type}
                />
            </section>


        </main>
    );
};

const getTrackInfo = async (id) => {
    try {
        return await hacerSolicitud(`https://api.spotify.com/v1/tracks/${id}`);
    } catch (error) {
        console.error("Error al obtener la información de la canción", error);
        throw error;
    }
};

export default Cancion;
