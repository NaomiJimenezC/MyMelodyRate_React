import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { hacerSolicitud } from "../config/Spotify.jsx";
import Card from "../Components/Card.jsx";

const Cancion = () => {
    const [infoTrack, setInfoTrack] = useState(null); // Initialize as null for better conditional rendering
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        if (id) {
            getTrackInfo(id).then(setInfoTrack).catch(error => console.error(error));
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
            <section>
                {album && album.images && album.images.length > 0 && (
                    <img src={album.images[1].url} alt={`${name} album cover`}/>
                )}
                <h1>{name}</h1>
                <p>Fecha de lanzamiento: {album.release_date}</p>

                <p>
                    Artista(s): {artists.map((artist, index) => (
                    <span key={artist.id}>
                         <a href={`/artist?id=${artist.id}`}>{artist.name}</a>
                        {index < artists.length - 1 && ", "}
                    </span>
                ))}
                </p>
                <p>Duración: {(duration_ms / 60000).toFixed(2)} minutos</p>
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
                <article>
                    <h1>Se encuentra en el siguiente álbum:</h1>
                    <Card
                        id={album.id}
                        name={album.name}
                        image={album.images[1].url}
                        typeOfMusic={album.type}
                    />
                </article>
            </section>
        </main>
    );
};

const getTrackInfo = async (id) => {
    try {
        return await hacerSolicitud(`https://api.spotify.com/v1/tracks/${id}`);
    } catch (error) {
        console.error("Error al obtener la información de la canción", error);
        throw error; // Rethrow to handle in the component
    }
};

export default Cancion;
